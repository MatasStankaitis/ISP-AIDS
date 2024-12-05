import connection from "../sqlConnection.js";

export const getGroups = async () => {
  try {
    const [results, fields] = await connection.execute(
      `SELECT * FROM Academic_groups`
    );

    return results;
  } catch (err) {
    console.log(err);
  }
};
