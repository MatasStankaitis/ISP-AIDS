import connection from "../../config/sqlConnection.js";

export const getLecturerStatusesController = async (req, res) => {
  try {
    const [statuses] = await connection.query("SELECT * FROM Lecturer_statuses");
    res.status(200).json(statuses);
  } catch (error) {
    console.error("Error fetching lecturer statuses:", error);
    res.status(500).json({ error: "Failed to fetch lecturer statuses." });
  }
};

export const createLecturerController = async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Log incoming data
  
      const {
        username,
        name,
        surname,
        phone_number,
        email,
        home_address,
        gender,
        current_salary,
        status,
        picture_url,
      } = req.body;
  
      // Insert into Users table
      const [userResult] = await connection.query(
        `INSERT INTO Users (username, name, surname, phone_number, email, home_address, gender, photo_URL) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [username, name, surname, phone_number, email, home_address, gender, picture_url]
      );
      console.log("User Table Insert Result:", userResult);
  
      // Insert into Lecturers table
      const [lecturerResult] = await connection.query(
        `INSERT INTO Lecturers (username, current_salary, experience, status) 
         VALUES (?, ?, ?, ?)`,
        [username, current_salary, 0, status]
      );
      console.log("Lecturers Table Insert Result:", lecturerResult);
  
      res.status(201).json({ message: "Lecturer created successfully." });
    } catch (error) {
      console.error("Error in createLecturerController:", error);
      res.status(500).json({ error: "Failed to create lecturer." });
    }

  };
  export const getAllLecturersController = async (req, res) => {
  try {
    const [lecturers] = await connection.query(
      `SELECT 
        u.username, 
        u.name, 
        u.surname, 
        u.phone_number, 
        u.email, 
        u.home_address, 
        u.photo_URL, 
        l.current_salary, 
        l.status, 
        l.experience 
       FROM Users u 
       INNER JOIN Lecturers l ON u.username = l.username`
    );
    res.status(200).json(lecturers);
  } catch (err) {
    console.error("Error fetching lecturers:", err);
    res.status(500).json({ error: "Failed to fetch lecturers" });
  }
};
