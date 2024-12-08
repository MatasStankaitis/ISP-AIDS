import connection from "#config/sqlConnection.js";

export const createSubject = async (
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
      `INSERT INTO Subjects (code, name, credits, description, language, is_remote, fk_Facultyid, year)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [code, name, credits, description, language, is_remote, fk_Facultyid, year]  // Add this value
    );
    return results.insertId;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create subject");
  }
};