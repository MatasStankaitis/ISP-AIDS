// grades.js
import connection from "#config/sqlConnection.js";

// Function to get student grades by subject and username
export const getStudentGradesBySubject = async (subjectCode, username) => {
  try {
    const [results] = await connection.execute(
      `SELECT Grades.id, Grades.value, Grades.comment, Grades.created_at, Grades.updated_at, Grades.is_exam, Grades.importance 
       FROM Grades
       INNER JOIN Student_subjects ss ON Grades.fk_StudentSubjectid = ss.id
       INNER JOIN Students s ON ss.fk_Studentusername = s.username
       INNER JOIN Subject_times st ON ss.fk_SubjectTimeid = st.id
       WHERE st.fk_Subjectcode = ? AND s.username = ?`,
      [subjectCode, username]
    );

    return results;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch student grades by subject");
  }
};

// Function to add a new grade
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
    const [results] = await connection.execute(
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
      throw new Error("Failed to add grade");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to add grade");
  }
};

// Function to update grades based on fk_StudentSubjectid and created_at
export const updateStudentGradesBySubjectAndStudent = async (
  fk_StudentSubjectid,
  value,
  comment,
  is_exam,
  importance,
  created_at
) => {
  try {
    const updated_at = new Date();

    const [results] = await connection.execute(
      `UPDATE Grades 
       SET value = ?, comment = ?, updated_at = ?, is_exam = ?, importance = ?
       WHERE fk_StudentSubjectid = ? AND created_at = ?`,
      [
        value,
        comment,
        updated_at,
        is_exam,
        importance,
        fk_StudentSubjectid,
        created_at,
      ]
    );

    if (results.affectedRows <= 0) {
      throw new Error("Grade not found to update.");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update grade");
  }
};