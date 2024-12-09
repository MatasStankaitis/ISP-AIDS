import connection from "#config/sqlConnection.js";

export const getStudentSubjects = async (username) => {
  try {
    const [results] = await connection.execute(
      `SELECT ss.*, s.name as subject_name, s.code as subject_code, st.id as subject_time_id
       FROM Student_subjects ss
       JOIN Subject_times st ON ss.fk_SubjectTimeid = st.id
       JOIN Subjects s ON st.fk_Subjectcode = s.code
       WHERE ss.fk_Studentusername = ?`,
      [username]
    );
    return results;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch student subjects");
  }
};