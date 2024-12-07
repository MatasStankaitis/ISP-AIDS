// src/repository/dorms/cancelDormReservation.js
import connection from "#config/sqlConnection.js";
import { NotFoundError } from "#utils/errors.js";

export const cancelDormReservation = async (roomId) => {
  try {
    // Check if room has reservation
    const [reservationCheck] = await connection.execute(
      `SELECT * FROM Room_reservations WHERE fk_Roomid = ? AND active = 1`,
      [roomId]
    );

    if (reservationCheck.length === 0) {
      throw new NotFoundError("No active reservation found for this room");
    }

    await connection.execute(
      `UPDATE Room_reservations 
       SET active = 0, canceled_date = CURRENT_TIMESTAMP 
       WHERE fk_Roomid = ? AND active = 1`,
      [roomId]
    );

    await connection.execute(
      `UPDATE Dorm_rooms SET status = '1' WHERE id = ?`,
      [roomId]
    );

    return true;
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to cancel reservation");
  }
};