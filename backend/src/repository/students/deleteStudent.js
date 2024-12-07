import connection from "#config/sqlConnection.js";
import { NotFoundError } from "#utils/errors.js";

export const deleteUser = async (username) => {
  try {
    const [results, fields] = await connection.execute(
      `DELETE FROM Users 
      WHERE Users.username=?`,
      [username]
    );
    if (results.affectedRows <= 0) {
      throw new NotFoundError("user not found");
    }
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    console.log(err);
    throw new Error("failed to update student");
  }
};
