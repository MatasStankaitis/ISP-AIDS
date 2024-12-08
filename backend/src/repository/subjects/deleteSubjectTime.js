import connection from "#config/sqlConnection.js";
import { NotFoundError } from "#utils/errors.js";

export const deleteSubjectTime = async (id) => {
  try {
    const [results] = await connection.execute(
      `DELETE FROM Subject_times WHERE id = ?`,
      [id]
    );

    if (results.affectedRows === 0) {
      throw new NotFoundError("Subject time not found");
    }

    return true;
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to delete subject time");
  }
};