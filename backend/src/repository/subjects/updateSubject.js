import connection from "#config/sqlConnection.js";
import { NotFoundError } from "#utils/errors.js";

export const updateSubject = async (
  code,
  name,
  credits,
  description,
  language,
  is_remote,
  fk_Facultyid,
  year  // Add this parameter
) => {
  try {
    const [results] = await connection.execute(
      `UPDATE Subjects 
       SET name = ?, credits = ?, description = ?, language = ?, is_remote = ?, fk_Facultyid = ?, year = ?
       WHERE code = ?`,
      [name, credits, description, language, is_remote, fk_Facultyid, year, code]  // Add this value
    );

    if (results.affectedRows === 0) {
      throw new NotFoundError("Subject not found");
    }

    return true;
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to update subject");
  }
};