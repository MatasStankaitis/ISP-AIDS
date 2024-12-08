import connection from "#config/sqlConnection.js";

export const getSubjects = async () => {
  try {
    const [results] = await connection.execute(`SELECT * FROM Subjects`);
    return results;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch subjects");
  }
};
