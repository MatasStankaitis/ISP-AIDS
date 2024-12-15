import connection from "#config/sqlConnection.js";
import { NotFoundError } from "#utils/errors.js";

export const getSubject = async (code) => {
  try {
    const [results] = await connection.execute(
      `SELECT * FROM Subjects WHERE code = ?`,
      [code]
    );

    if (results.length === 0) {
      throw new NotFoundError("Subject not found");
    }

    return results[0];
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to fetch subject");
  }
};
