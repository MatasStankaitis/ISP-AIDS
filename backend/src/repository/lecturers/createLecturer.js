import connection from "../../config/sqlConnection.js";
import argon2 from "argon2";

// Function to create a lecturer
export async function createLecturer(lecturerData) {
    console.log("hash = ");
  try {
    const password_hash = await argon2.hash("password");

    // Insert into Users table
    await connection.query( 
      `INSERT INTO Users (username, password_hash, name, surname, phone_number, email, home_address, gender, photo_URL) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        lecturerData.username,
        password_hash,
        lecturerData.name,
        lecturerData.surname,
        lecturerData.phone_number,
        lecturerData.email,
        lecturerData.home_address,
        lecturerData.gender,
        lecturerData.picture_url,
      ]
    );

    // Insert into Lecturers table
    await connection.query(
      `INSERT INTO Lecturers (username, current_salary, experience, faculty, status) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        lecturerData.username,
        lecturerData.current_salary,
        0,
        lecturerData.faculty,
        lecturerData.status,
      ]
    );

    return { success: true };
  } catch (error) {
    console.error("Error in createLecturer:", error);
    throw error;
  }
}

// Function to fetch all lecturers
export async function getAllLecturers() {
  try {
    const query = `
      SELECT 
        u.username, 
        u.name, 
        u.surname, 
        u.phone_number, 
        u.email, 
        u.home_address, 
        u.photo_URL, 
        g.name AS gender_name,
        f.name AS faculty_name,
        l.current_salary, 
        l.status AS status_id, 
        s.name AS status_name,
        l.experience 
      FROM Lecturers l
      INNER JOIN Users u ON l.username = u.username
      LEFT JOIN Genders g ON u.gender = g.id
      LEFT JOIN Faculties f ON l.faculty = f.id
      LEFT JOIN Lecturer_statuses s ON l.status = s.id;
    `;
    const [rows] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error("Error in getAllLecturers:", error);
    throw error;
  }
}
