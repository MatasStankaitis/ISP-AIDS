import connection from "../sqlConnection.js";

export const getGenders = async () => {
  try {
    const [results, fields] = await connection.execute(`SELECT * FROM Genders`);

    return results;
  } catch (err) {
    console.log(err);
  }
};
