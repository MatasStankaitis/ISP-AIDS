import connection from "#config/sqlConnection.js";

export const addStudentGrade = async (
  value,
  comment,
  created_at,
  updated_at,
  is_exam,
  importance,
  fk_StudentSubjectid
) => {
  try {
    const [results, fields] = await connection.execute(
      `INSERT INTO Grades (value, comment, created_at, updated_at, is_exam, importance, fk_StudentSubjectid)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        value,
        comment,
        created_at,
        updated_at,
        is_exam,
        importance,
        fk_StudentSubjectid,
      ]
    );

    if (results.affectedRows <= 0) {
      throw new Error("failed to add grade");
    }
  } catch (err) {
    console.log(err);
    throw new Error("failed to add grade");
  }
};