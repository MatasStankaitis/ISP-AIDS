import connection from '#config/sqlConnection.js';
import argon2 from 'argon2';
import session from 'express-session';

export const registerController = async (req, res) => {
  const { username, password, name, surname, phone_number, email, home_address, gender } = req.body;

  try {
    // Hash the password before storing
    const password_hash = await argon2.hash(password);

    // Insert into Users table with approved set to FALSE
    await connection.execute(
      `INSERT INTO Users (username, password_hash, name, surname, phone_number, email, home_address, gender, approved)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, FALSE)`,
      [username, password_hash, name, surname, phone_number, email, home_address, gender]
    );

    res.status(201).json({ message: 'Registration successful. Awaiting approval.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch user from database
    const [users] = await connection.execute(
      `SELECT * FROM Users WHERE username = ?`,
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Check if user is approved
    if (!user.approved) {
      return res.status(403).json({ error: 'Account not approved' });
    }

    if (! await argon2.verify(user.password_hash, password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Determine user role
    const role = await getUserRole(user.username);
    // Store user info in session
    req.session.user = { username: user.username, role };
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ error: 'Login failed' });
      }
      res.status(200).json({ message: 'Login successful', username: user.username, role });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

// Helper function to get user role
export const getUserRole = async (username) => {
  console.log('Getting role for:', username);
  // Check Administrator
  const [admins] = await connection.execute(
    `SELECT username FROM Administrators WHERE username = ?`,
    [username]
  );
  if (admins.length > 0) return 'administrator';

  // Check Lecturer
  const [lecturers] = await connection.execute(
    `SELECT username FROM Lecturers WHERE username = ?`,
    [username]
  );
  if (lecturers.length > 0) return 'lecturer';

  // Check Student
  const [students] = await connection.execute(
    `SELECT username FROM Students WHERE username = ?`,
    [username]
  );
  if (students.length > 0) return 'student';

  // Default role if none found
  return 'guest';
};

export const logoutController = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error:', err);
      res.status(500).json({ error: 'Logout failed' });
    } else {
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logout successful' });
    }
  });
};

export const checkAuthController = (req, res) => {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(200).json({ user: null });
  }
};