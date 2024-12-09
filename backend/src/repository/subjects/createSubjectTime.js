import connection from "#config/sqlConnection.js";
import { ValidationError } from "#utils/errors.js";

export const createSubjectTime = async (hour, day, classroom, capacity, fk_Subjectcode, even_week) => {
  try {
    // Check for duplicate time considering even_week value
    const [existingTimes] = await connection.execute(
      `SELECT id FROM Subject_times WHERE hour = ? AND day = ? AND classroom = ? AND fk_Subjectcode = ? AND even_week = ?`,
      [hour, day, classroom, fk_Subjectcode, even_week]
    );

    if (existingTimes.length > 0) {
      throw new ValidationError("A subject time with the same hour, day, classroom, subject code, and even week value already exists.");
    }

    const [results] = await connection.execute(
      `INSERT INTO Subject_times (hour, day, classroom, capacity, fk_Subjectcode, even_week)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [hour, day, classroom, capacity, fk_Subjectcode, even_week]
    );

    return results.insertId;
  } catch (err) {
    if (err instanceof ValidationError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to create subject time");
  }
};

export default createSubjectTime;