import connection from "#config/sqlConnection.js";
import { NotFoundError } from "#utils/errors.js";

export const reserveDormRoom = async (roomId, studentUsername) => {
  try {
    // Check if room is available
    const [roomCheck] = await connection.execute(
      `SELECT status FROM Dorm_rooms WHERE id = ?`,
      [roomId]
    );

    if (roomCheck.length === 0) {
      throw new NotFoundError("Room not found");
    }
    console.log(roomCheck[0].status);
    if (roomCheck[0].status !== 1) {
      throw new Error("Room is not available");
    }

    // Create reservation and update room status
    const [results] = await connection.execute(
      `INSERT INTO Room_reservations (fk_Roomid, fk_Studentusername)
       VALUES (?, ?)`,
      [roomId, studentUsername]
    );

    await connection.execute(
      `UPDATE Dorm_rooms SET status = '2' WHERE id = ?`,
      [roomId]
    );

    return true;
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to reserve room");
  }
};