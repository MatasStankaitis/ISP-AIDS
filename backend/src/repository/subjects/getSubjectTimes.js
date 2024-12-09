import connection from "#config/sqlConnection.js";

export const getSubjectTimes = async (subjectCode) => {
  try {
    const [results] = await connection.execute(
      `SELECT st.*, COUNT(ss.id) as registered_students, st.capacity
       FROM Subject_times st
       LEFT JOIN Student_subjects ss ON st.id = ss.fk_SubjectTimeid
       WHERE st.fk_Subjectcode = ?
       GROUP BY st.id`,
      [subjectCode]
    );
    return results;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch subject times");
  }
};