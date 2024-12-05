import connection from "../sqlConnection.js";

export const getFaculties = async () => {
  try {
    const [results, fields] = await connection.execute(
      `SELECT * FROM Faculties`
    );

    return results;
  } catch (err) {
    console.log(err);
  }
};
