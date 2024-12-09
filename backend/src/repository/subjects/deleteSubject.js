import connection from "#config/sqlConnection.js";
import { NotFoundError } from "#utils/errors.js";

export const deleteSubject = async (code) => {
  try {
    const [results] = await connection.execute(
      `DELETE FROM Subjects WHERE code = ?`,
      [code]
    );

    if (results.affectedRows === 0) {
      throw new NotFoundError("Subject not found");
    }

    return true;
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to delete subject");
  }
};
