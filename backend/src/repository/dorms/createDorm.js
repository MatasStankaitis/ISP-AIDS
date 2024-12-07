import connection from "#config/sqlConnection.js";

export const createDorm = async (number, address, room_count) => {
  try {
    const [results] = await connection.execute(
      `INSERT INTO Dorms (number, address, room_count)
       VALUES (?, ?, ?)`,
      [number, address, room_count]
    );
    return results.insertId;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create dorm");
  }
};