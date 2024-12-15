import connection from "#config/sqlConnection.js";
import { NotFoundError } from "#utils/errors.js";

export const deleteSubject = async (code) => {
  try {
    // Start transaction
    await connection.beginTransaction();

    try {
      // First delete associated student subjects
      await connection.execute(
        `DELETE ss FROM Student_subjects ss
         INNER JOIN Subject_times st ON ss.fk_SubjectTimeid = st.id
         WHERE st.fk_Subjectcode = ?`,
        [code]
      );

      // Then delete associated subject times
      await connection.execute(
        `DELETE FROM Subject_times WHERE fk_Subjectcode = ?`,
        [code]
      );

      // Then delete the subject
      const [results] = await connection.execute(
        `DELETE FROM Subjects WHERE code = ?`,
        [code]
      );

      if (results.affectedRows === 0) {
        throw new NotFoundError("Subject not found");
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
    throw new Error("Failed to delete subject");
  }
};