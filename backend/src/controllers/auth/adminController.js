import connection from '#config/sqlConnection.js';
import { getUserRole } from '#controllers/auth/authController.js';

export const approveUserController = async (req, res) => {
  const { username } = req.body;

  try {
    // Update user's approved status
    await connection.execute(
      `UPDATE Users SET approved = TRUE WHERE username = ?`,
      [username]
    );
    res.status(200).json({ message: 'User approved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Approval failed' });
  }
};

export const disapproveUserController = async (req, res) => {
  const { username } = req.body;
  try {
    await connection.execute('UPDATE Users SET approved = FALSE WHERE username = ?', [username]);
    res.status(200).json({ message: 'User disapproved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to disapprove user' });
  }
};

export const getUsersController = async (req, res) => {
  try {
    const [users] = await connection.execute('SELECT username, approved FROM Users');
    users.forEach(async (user) => {
      user.role = await getUserRole(user.username);
    });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};