import connection from "#config/sqlConnection.js";

export const updateStudentGradesBySubjectAndStudent = async (
  gradeId,
  value,
  comment,
  updated_at,
  is_exam,
  importance
) => {
  try {
    const [results, fields] = await connection.execute(
      `UPDATE Grades 
      SET value=?, comment=?, is_exam=?
      WHERE id=?`,
      [value, comment, is_exam, gradeId]
    );

    if (results.affectedRows <= 0) {
      throw new Error("grade not found");
    }
  } catch (err) {
    console.log(err);
    throw new Error("failed to update grade");
  }
};
