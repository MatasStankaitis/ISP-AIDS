import connection from "#config/sqlConnection.js";
import { ValidationError } from "#utils/errors.js";

export const createDormRequest = async (studentUsername, type, description) => {
  try {
    if (!studentUsername || !type) {
      throw new ValidationError("Student username and request type are required");
    }

    const [results] = await connection.execute(
      `INSERT INTO Dorm_requests 
       (fk_Studentusername, type, description, status, date_created) 
       VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP)`,
      [studentUsername, type, description]
    );

    if (results.affectedRows === 0) {
      throw new Error("Failed to create request");
    }

    return results.insertId;
  } catch (err) {
    if (err instanceof ValidationError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to create dorm request");
  }
};