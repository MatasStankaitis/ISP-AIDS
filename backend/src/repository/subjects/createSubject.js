import connection from "#config/sqlConnection.js";

export const createSubject = async (
  code,
  name,
  credits,
  description,
  language,
  is_remote,
  fk_Facultyid
) => {
  try {
    const [results] = await connection.execute(
      `INSERT INTO Subjects (code, name, credits, description, language, is_remote, fk_Facultyid)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [code, name, credits, description, language, is_remote, fk_Facultyid]
    );
    return results.insertId;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create subject");
  }
};
