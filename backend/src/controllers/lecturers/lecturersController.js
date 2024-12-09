import { createLecturer, getAllLecturers } from "../../repository/lecturers/createLecturer.js";
import connection from "../../config/sqlConnection.js";

// Controller to fetch lecturer statuses
export const getLecturerStatusesController = async (req, res) => {
  try {
    const [statuses] = await connection.query("SELECT * FROM Lecturer_statuses");
    res.status(200).json(statuses);
  } catch (error) {
    console.error("Error fetching lecturer statuses:", error);
    res.status(500).json({ error: "Failed to fetch lecturer statuses." });
  }
};

// Controller to create a new lecturer
export const createLecturerController = async (req, res) => {
  try {
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
      faculty,
    } = req.body;

    // Validate Faculty
    const [[facultyExists]] = await connection.query(
      `SELECT id FROM Faculties WHERE id = ?`,
      [faculty]
    );
    if (!facultyExists) {
      return res.status(400).json({ error: "Invalid faculty ID" });
    }

    // Create Lecturer
    await createLecturer({
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
      faculty,
    });

    res.status(201).json({ message: "Lecturer created successfully." });
  } catch (error) {
    console.error("Error in createLecturerController:", error);
    res.status(500).json({ error: "Failed to create lecturer." });
  }
};

// Controller to fetch all lecturers
export const getAllLecturersController = async (req, res) => {
  try {
    const lecturers = await getAllLecturers();
    console.log("Fetched Lecturers:", lecturers);
    res.status(200).json(lecturers);
  } catch (err) {
    console.error("Error fetching lecturers:", err);
    res.status(500).json({ error: "Failed to fetch lecturers" });
  }
};
export const getSingleLecturerController = async (req, res) => {
    const { username } = req.params;
  
    try {
      const [lecturer] = await connection.query(
        `SELECT 
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
        LEFT JOIN Lecturer_statuses s ON l.status = s.id
        WHERE l.username = ?`,
        [username]
      );
  
      if (!lecturer.length) {
        return res.status(404).json({ error: "Lecturer not found" });
      }
  
      res.status(200).json(lecturer[0]);
    } catch (err) {
      console.error("Error fetching lecturer:", err);
      res.status(500).json({ error: "Failed to fetch lecturer" });
    }
  };

  export const updateLecturerController = async (req, res) => {
    const { username } = req.params; // Ensure this matches the frontend
    const updateData = req.body;
  
    console.log("Updating Lecturer:", username); // Debug log
    console.log("Update Data:", updateData);     // Debug log
  
    try {
      const [userResult] = await connection.query(
        `UPDATE Users SET 
         name = ?, surname = ?, phone_number = ?, email = ?, home_address = ?, gender = ? 
         WHERE username = ?`,
        [
          updateData.name,
          updateData.surname,
          updateData.phone_number,
          updateData.email,
          updateData.home_address,
          updateData.gender,
          username,
        ]
      );
  
      if (userResult.affectedRows === 0) {
        return res.status(404).json({ error: "Lecturer not found." });
      }
  
      const [lecturerResult] = await connection.query(
        `UPDATE Lecturers SET current_salary = ?, status = ?, faculty = ? WHERE username = ?`,
        [updateData.current_salary, updateData.status, updateData.faculty, username]
      );
  
      res.status(200).json({ message: "Lecturer updated successfully." });
    } catch (error) {
      console.error("Error updating lecturer:", error);
      res.status(500).json({ error: "Failed to update lecturer." });
    }
  };
// Controller to delete a lecturer
export const deleteLecturerController = async (req, res) => {
    try {
      const { username } = req.params;
      console.log("Deleting lecturer with username:", username);
  
      const [lecturerResult] = await connection.query(
        `DELETE FROM Lecturers WHERE username = ?`,
        [username]
      );
      console.log("Lecturer delete result:", lecturerResult);
  
      const [userResult] = await connection.query(
        `DELETE FROM Users WHERE username = ?`,
        [username]
      );
      console.log("User delete result:", userResult);
  
      if (lecturerResult.affectedRows > 0 && userResult.affectedRows > 0) {
        res.status(200).json({ message: "Lecturer deleted successfully." });
      } else {
        res.status(404).json({ error: "Lecturer not found." });
      }
    } catch (error) {
      console.error("Error deleting lecturer:", error);
      res.status(500).json({ error: "Failed to delete lecturer." });
    }
  };
  
  
  
  
