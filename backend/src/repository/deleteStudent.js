import connection from "../sqlConnection.js";

export const deleteUser = async (username) => {
  try {
    const [results, fields] = await connection.execute(
      `DELETE FROM Users 
      WHERE Users.username=?`,
      [username]
    );

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
