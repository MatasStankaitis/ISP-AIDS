import connection from "../sqlConnection.js";

export const deleteUser = async (username) => {
  try {
    const [results, fields] = await connection.execute(
      `DELETE FROM Users 
      WHERE Users.username=?`,
      [username]
    );
  } catch (err) {
    console.log(err);
    throw new Error("failed to delete student");
  }
};
