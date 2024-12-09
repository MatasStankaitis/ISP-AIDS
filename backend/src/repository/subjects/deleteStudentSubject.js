import connection from "#config/sqlConnection.js";
import { NotFoundError } from "#utils/errors.js";

export const deleteStudentSubject = async (id) => {
  try {
    // Start transaction
    await connection.beginTransaction();

    try {
      // Delete related grades
      await connection.execute(
        `DELETE FROM Grades WHERE fk_StudentSubjectid = ?`,
        [id]
      );

      // Delete the student subject
      const [results] = await connection.execute(
        `DELETE FROM Student_subjects WHERE id = ?`,
        [id]
      );

      if (results.affectedRows === 0) {
        throw new NotFoundError("Student subject not found");
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
    throw new Error("Failed to delete student subject");
  }
};