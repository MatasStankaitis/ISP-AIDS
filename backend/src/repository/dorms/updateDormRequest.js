import connection from "#config/sqlConnection.js";
import { NotFoundError } from "#utils/errors.js";

export const updateDormRequest = async (requestId, status, adminUsername) => {
  try {
    const [results] = await connection.execute(
      `UPDATE Dorm_requests 
       SET status = ?, fk_Administratorusername = ?
       WHERE id = ?`,
      [status, adminUsername, requestId]
    );

    if (results.affectedRows === 0) {
      throw new NotFoundError("Request not found");
    }

    return true;
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to update request");
  }
};