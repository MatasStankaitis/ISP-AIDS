import connection from "#config/sqlConnection.js";
import { ValidationError } from "#utils/errors.js";

export const createSubject = async (
  code,
  name,
  credits,
  description,
  language,
  is_remote,
  fk_Facultyid,
  year
) => {
  try {
    const [existingSubjects] = await connection.execute(
      `SELECT code FROM Subjects WHERE code = ?`,
      [code]
    );

    if (existingSubjects.length > 0) {
      throw new ValidationError("A subject with the same code already exists.");
    }

    const [existingSubjectsWithSameAttributes] = await connection.execute(
      `SELECT code FROM Subjects WHERE name = ? AND credits = ? AND language = ? AND is_remote = ? AND fk_Facultyid = ? AND year = ?`,
      [name, credits, language, is_remote, fk_Facultyid, year]
    );

    if (existingSubjectsWithSameAttributes.length > 0) {
      throw new ValidationError("A subject with the same name, credits, language, is_remote, fk_Facultyid, and year already exists.");
    }

    const [results] = await connection.execute(
      `INSERT INTO Subjects (code, name, credits, description, language, is_remote, fk_Facultyid, year)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [code, name, credits, description, language, is_remote, fk_Facultyid, year]
    );
    return results.insertId;
  } catch (err) {
    if (err instanceof ValidationError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to create subject");
  }
};