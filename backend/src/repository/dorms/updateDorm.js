import connection from "#config/sqlConnection.js";
import { NotFoundError } from "#utils/errors.js";

export const updateDorm = async (id, number, address, room_count) => {
  try {

    const [existingDorms] = await connection.execute(
      `SELECT id FROM Dorms WHERE number = ? AND id != ?`,
      [number, id]
    );

    if (existingDorms.length > 0) {
      throw new Error("Bendrabutis tokiu numeriu jau egzistuoja");
    }

    const [results] = await connection.execute(
      `UPDATE Dorms 
       SET number = ?, address = ?, room_count = ?
       WHERE id = ?`,
      [number, address, room_count, id]
    );
    
    if (results.affectedRows === 0) {
      throw new NotFoundError("Bendrabutis nerastas");
    }
    
    return true;
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    console.error(err);
    throw new Error(err.message);
  }
};