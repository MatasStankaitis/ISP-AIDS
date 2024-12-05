import connection from "../sqlConnection.js";

export const createStudent = async (
  username,
  year,
  state_funded,
  fk_Facultyid,
  fk_Groupid
) => {
  try {
    const [results, fields] = await connection.execute(
      `INSERT INTO Students (username, year, state_funded, fk_Facultyid, fk_Groupid)
        VALUES
        (?, ?, ?, ?, ?)`,
      [username, year, state_funded, fk_Facultyid, fk_Groupid]
    );

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
