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
    const values = [name, surname, facultyId, year, academicGroupId].map(
      (v) => v ?? null
    );

    console.log(name, surname);

    const [results, fields] = await connection.execute(
      `SELECT * FROM Users 
      INNER JOIN Students ON Students.username=Users.username
      WHERE
      Users.name LIKE IFNULL(CONCAT(?,"%"), Users.name) AND
      Users.surname LIKE IFNULL(CONCAT(?,"%"), Users.surname) AND
      Students.fk_Facultyid = IFNULL(CONCAT(?,"%"), Students.fk_Facultyid) AND
      Students.year LIKE IFNULL(CONCAT(?,"%"), Students.year) AND
      Students.fk_Groupid LIKE IFNULL(CONCAT(?,"%"), Students.fk_Groupid)`,
      values
    );

    return results;
  } catch (err) {
    console.log(err);
  }
};
