// src/repository/dorms/deleteDorm.js
import connection from "#config/sqlConnection.js";
import { NotFoundError } from "#utils/errors.js";

export const deleteDorm = async (id) => {
  try {
    // Start transaction
    await connection.beginTransaction();

    try {
      // First delete associated rooms
      const [roomResults] = await connection.execute(
        `DELETE FROM Dorm_rooms WHERE fk_Dormid = ?`,
        [id]
      );

      // Then delete the dorm
      const [dormResults] = await connection.execute(
        `DELETE FROM Dorms WHERE id = ?`,
        [id]
      );

      if (dormResults.affectedRows === 0) {
        throw new NotFoundError(`Dorm with id ${id} not found`);
      }

      // Commit transaction
      await connection.commit();
      return true;

    } catch (error) {
      // Rollback on error
      await connection.rollback();
      throw error;
    }

  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to delete dorm");
  }
};