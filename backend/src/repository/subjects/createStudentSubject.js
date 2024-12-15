import connection from "#config/sqlConnection.js";
import { ValidationError } from "#utils/errors.js";

export const createStudentSubject = async (studentUsername, subjectTimeId) => {
  try {
    if (!studentUsername || !subjectTimeId) {
      throw new ValidationError("Student username and subject time ID are required");
    }

    const [results] = await connection.execute(
      `INSERT INTO Student_subjects (fk_Studentusername, fk_SubjectTimeid, passed)
       VALUES (?, ?, ?)`,
      [studentUsername, subjectTimeId, 0]
    );

    if (results.affectedRows === 0) {
      throw new Error("Failed to create student subject");
    }

    return results.insertId;
  } catch (err) {
    if (err instanceof ValidationError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to create student subject");
  }
};