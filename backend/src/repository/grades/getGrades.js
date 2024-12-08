import connection from "#config/sqlConnection.js";

export const getStudentGradesBySubject = async (subjectCode, username) => {
  try {
    const [results, fields] = await connection.execute(
      `SELECT Users.username, Users.surname, Users.name, Grades.value, Grades.comment, Grades.created_at, Grades.updated_at, Grades.is_exam, Grades.importance 
      FROM Users 
      INNER JOIN Students ON Students.username = Users.username
      INNER JOIN Student_subjects ON Student_subjects.fk_Studentusername = Students.username
      INNER JOIN Subject_times ON Subject_times.id = Student_subjects.fk_SubjectTimeid
      INNER JOIN Grades ON Grades.fk_StudentSubjectid = Student_subjects.id
      WHERE Subject_times.fk_Subjectcode = ? AND Users.username = ?`,
      [subjectCode, username]
    );

    return results;
  } catch (err) {
    console.log(err);
    throw new Error("failed to fetch student grades by subject");
  }
};