import connection from "#config/sqlConnection.js";
import { NotFoundError } from "#utils/errors.js";

export const deleteSubjectTime = async (id) => {
  try {
    // Start transaction
    await connection.beginTransaction();

    try {
      // First delete associated student subjects
      await connection.execute(
        `DELETE FROM Student_subjects WHERE fk_SubjectTimeid = ?`,
        [id]
      );

      // Then delete the subject time
      const [results] = await connection.execute(
        `DELETE FROM Subject_times WHERE id = ?`,
        [id]
      );

      if (results.affectedRows === 0) {
        throw new NotFoundError("Subject time not found");
      }

      // Commit transaction
      await connection.commit();
      return true;
    } catch (error) {
      // Rollback on error
      await connection.rollback();
      throw error;
    }
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to delete subject time");
  }
};