import connection from "#config/sqlConnection.js";
import { NotFoundError } from "#utils/errors.js";

export const getDorm = async (dormId) => {
  try {
    const [results] = await connection.execute(
      `SELECT * FROM Dorms WHERE id = ?`,
      [dormId]
    );
    
    if (results.length === 0) {
      throw new NotFoundError("Dorm not found");
    }
    
    return results[0];
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to fetch dorm");
  }
};