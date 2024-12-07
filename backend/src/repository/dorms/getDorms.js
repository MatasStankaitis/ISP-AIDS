import connection from "#config/sqlConnection.js";

export const getDorms = async () => {
  try {
    const [results] = await connection.execute(
      `SELECT * FROM Dorms`
    );
    return results;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch dorms");
  }
};