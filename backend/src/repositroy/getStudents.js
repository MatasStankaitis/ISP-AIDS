import connection from "../sqlConnection.js";

export const getStudents = async (
  name,
  surname,
  facultyId,
  year,
  academicGroupId
) => {
  try {
    // Implement filtering later
    const [results, fields] = await connection.execute(
      "SELECT * FROM Users INNER JOIN Students ON Students.username=Users.username"
    );

    return results;
  } catch (err) {
    console.log(err);
  }
};
