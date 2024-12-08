import connection from "#config/sqlConnection.js";
import { NotFoundError, ValidationError } from "#utils/errors.js";

export const updateSubjectTime = async (id, hour, day, classroom, capacity, even_week) => {
  try {
    // Validate that all required fields are provided and are valid
    if (hour === undefined || day === undefined || classroom === undefined || capacity === undefined || even_week === undefined) {
      throw new ValidationError("All fields (hour, day, classroom, capacity, even_week) must be provided and valid");
    }

    const [results] = await connection.execute(
      `UPDATE Subject_times 
       SET hour = ?, day = ?, classroom = ?, capacity = ?, even_week = ?
       WHERE id = ?`,
      [hour, day, classroom, capacity, even_week, id]
    );

    if (results.affectedRows === 0) {
      throw new NotFoundError("Subject time not found");
    }

    return true;
  } catch (err) {
    if (err instanceof NotFoundError || err instanceof ValidationError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to update subject time");
  }
};