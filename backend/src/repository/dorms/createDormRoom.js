import connection from "#config/sqlConnection.js";

export const createDormRoom = async (
  room_number,
  floor_number,
  price,
  quality,
  status,
  fk_Dormid
) => {
  try {
    const [results] = await connection.execute(
      `INSERT INTO Dorm_rooms 
       (room_number, floor_number, price, quality, status, fk_Dormid)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [room_number, floor_number, price, quality, status, fk_Dormid]
    );
    return results.insertId;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create dorm room");
  }
};