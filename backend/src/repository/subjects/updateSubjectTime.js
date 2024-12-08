import connection from "#config/sqlConnection.js";
import { NotFoundError } from "#utils/errors.js";

export const updateSubjectTime = async (id, hour, day, classroom, capacity) => {
  try {
    const [results] = await connection.execute(
      `UPDATE Subject_times 
       SET hour = ?, day = ?, classroom = ?, capacity = ?
       WHERE id = ?`,
      [hour, day, classroom, capacity, id]
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
    throw new Error("Failed to update subject time");
  }
};