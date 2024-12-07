import connection from "#config/sqlConnection.js";

export const getDormRooms = async (dormId) => {
  try {
    const [results] = await connection.execute(
      `SELECT * FROM Dorm_rooms 
       WHERE fk_Dormid = ?`,
      [dormId]
    );
    return results;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch dorm rooms");
  }
};