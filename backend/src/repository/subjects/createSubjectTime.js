import connection from "#config/sqlConnection.js";

export const createSubjectTime = async (hour, day, classroom, capacity, fk_Subjectcode, even_week) => {
  try {
    console.log("ahahaha");
    const [results] = await connection.execute(
      `INSERT INTO Subject_times (hour, day, classroom, capacity, fk_Subjectcode, even_week)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [hour, day, classroom, capacity, fk_Subjectcode, even_week]
      
    );
    return results.insertId;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create subject time");
  }
};

export default createSubjectTime;