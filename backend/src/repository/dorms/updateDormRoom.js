import connection from "#config/sqlConnection.js";
import { NotFoundError, ValidationError } from "#utils/errors.js";

export const updateDormRoom = async (roomId, status) => {
  try {
    // Validate status is provided
    if (status === undefined) {
      throw new ValidationError("Status must be provided for update");
    } 
    console.log(roomId);
    console.log(status);
    const [result] = await connection.execute(
      `UPDATE Dorm_rooms 
       SET status = ?
       WHERE id = ?`,
      [status, roomId]
    );

    if (result.affectedRows === 0) {
      throw new NotFoundError("Room not found");
    }

    return true;
  } catch (err) {
    if (err instanceof NotFoundError || err instanceof ValidationError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to update room");
  }
};
