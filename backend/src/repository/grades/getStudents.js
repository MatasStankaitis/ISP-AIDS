import connection from "#config/sqlConnection.js";

export const getStudentsBySubject = async (subjectCode) => {
  try {
    const [results] = await connection.execute(
      `SELECT Users.username, Users.surname, Users.name, Students.fk_Facultyid, Students.fk_Groupid, Students.year 
      FROM Users 
      INNER JOIN Students ON Students.username = Users.username
      INNER JOIN Student_subjects ON Student_subjects.fk_Studentusername = Students.username
      INNER JOIN Subject_times ON Subject_times.id = Student_subjects.fk_SubjectTimeid
      WHERE Subject_times.fk_Subjectcode = ?`,
      [subjectCode]
    );

    return results;
  } catch (err) {
    console.log(err);
    throw new Error("failed to fetch students by subject");
  }
};