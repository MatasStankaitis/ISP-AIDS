// backend/src/repository/dorms/createDorm.js
import connection from "#config/sqlConnection.js";
import { AlreadyExistsError } from "#utils/errors.js";

export const createDorm = async (number, address, room_count) => {
  try {
    // Check if dorm number already exists
    const [existingDorm] = await connection.execute(
      `SELECT id FROM Dorms WHERE number = ?`,
      [number]
    );

    if (existingDorm.length > 0) {
      throw new AlreadyExistsError(`Bendrabutis nr.${number} jau egzistuoja.`);
    }

    // Insert new dorm
    const [results] = await connection.execute(
      `INSERT INTO Dorms (number, address, room_count)
       VALUES (?, ?, ?)`,
      [number, address, room_count]
    );
    return results.insertId;
  } catch (err) {
    if (err instanceof AlreadyExistsError) {
      throw err;
    }
    throw new Error("Nepavyko sukurti bendrabučio.");
  }
};