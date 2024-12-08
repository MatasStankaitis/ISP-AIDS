import connection from "../sqlConnection.js";

// Function to create a lecturer
export async function createLecturer(lecturerData) {
  const query = `
    INSERT INTO Users (username, name, surname, phone_number, email, home_address, gender)
    VALUES (?, ?, ?, ?, ?, ?, ?);
    INSERT INTO Lecturers (username, current_salary, faculty, status)
    VALUES (?, ?, ?, ?);
  `;
  const values = [
    lecturerData.username,
    lecturerData.name,
    lecturerData.surname,
    lecturerData.phone_number,
    lecturerData.email,
    lecturerData.home_address,
    lecturerData.gender,
    lecturerData.username,
    lecturerData.current_salary,
    lecturerData.faculty,
    lecturerData.status,
  ];

  const [rows] = await connection.query(query, values);
  return rows;
}

// Function to fetch all lecturers
export async function getAllLecturers() {
  const query = `
    SELECT 
      l.username,
      u.name,
      u.surname,
      u.phone_number,
      u.email,
      u.home_address,
      u.gender AS gender_id,
      g.name AS gender_name,
      l.faculty AS faculty_id,
      f.name AS faculty_name,
      l.current_salary,
      l.status AS status_id
    FROM Lecturers l
    JOIN Users u ON l.username = u.username
    LEFT JOIN Genders g ON u.gender = g.id
    LEFT JOIN Faculties f ON l.faculty = f.id;
  `;

  const [rows] = await connection.query(query);
  return rows;
}
