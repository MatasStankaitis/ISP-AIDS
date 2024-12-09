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
        username, // Required field
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
  
      // Validate required fields
      if (
        !username || // Ensure username is present
        !name ||
        !surname ||
        !email ||
        !home_address ||
        !gender ||
        !current_salary ||
        !status ||
        !faculty
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      // Validate Faculty
      const [[facultyExists]] = await connection.query(
        `SELECT id FROM Faculties WHERE id = ?`,
        [faculty]
      );
      if (!facultyExists) {
        return res.status(400).json({ error: "Invalid faculty ID" });
      }
  
      // Insert into Users table
      await createLecturer(req.body);
  
      // Insert into Lecturers table
  
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
export const updateLecturerSalaryController = async (req, res) => {
    const { username } = req.params;
    const { current_salary } = req.body;
  
    if (!current_salary || isNaN(current_salary)) {
      return res.status(400).json({ error: "Invalid salary input" });
    }
  
    try {
      const [result] = await connection.query(
        `UPDATE Lecturers SET current_salary = ? WHERE username = ?`,
        [current_salary, username]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Lecturer not found" });
      }
  
      res.status(200).json({ message: "Salary updated successfully" });
    } catch (error) {
      console.error("Error updating salary:", error);
      res.status(500).json({ error: "Failed to update salary" });
    }
  };
  // Get lecturer paychecks
export const getLecturerPaychecksController = async (req, res) => {
    const { username } = req.params;
    try {
      const [paychecks] = await connection.query(
        `SELECT * FROM Paychecks WHERE fk_Lecturerusername = ?`,
        [username]
      );
      res.status(200).json(paychecks);
    } catch (error) {
      console.error("Error fetching paychecks:", error);
      res.status(500).json({ error: "Failed to fetch paychecks." });
    }
  };
  
  // Add a new paycheck with bonus
  export const addLecturerPaycheckController = async (req, res) => {
    const { username } = req.params;
    const {
      working_rate,
      student_review_score,
      date,
      gross_pay,
      net_pay,
      working_hours,
      overtime_hours,
      overtime_rate,
      fk_Administratorusername
    } = req.body;
  
    if (!working_rate || !student_review_score || !date || !gross_pay || !net_pay || !working_hours || !overtime_hours || !overtime_rate || !fk_Administratorusername) {
      return res.status(400).json({ error: "Missing required fields for paycheck." });
    }
  
    try {
      const [result] = await connection.query(
        `INSERT INTO Paychecks (working_rate, student_review_score, date, gross_pay, net_pay, working_hours, overtime_hours, overtime_rate, fk_Administratorusername, fk_Lecturerusername)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          working_rate,
          student_review_score,
          date,
          gross_pay,
          net_pay,
          working_hours,
          overtime_hours,
          overtime_rate,
          fk_Administratorusername,
          username
        ]
      );
  
      if (result.affectedRows > 0) {
        res.status(201).json({ message: "Paycheck added successfully.", id: result.insertId });
      } else {
        res.status(500).json({ error: "Failed to add paycheck." });
      }
    } catch (error) {
      console.error("Error adding paycheck:", error);
      res.status(500).json({ error: "Failed to add paycheck." });
    }
  };
  // In lecturersController.js
export const updatePaycheckController = async (req, res) => {
    const { username, id } = req.params;
    const { gross_pay, net_pay } = req.body;
  
    if (gross_pay == null || net_pay == null) {
      return res.status(400).json({ error: "gross_pay and net_pay are required." });
    }
  
    try {
      const [result] = await connection.query(
        `UPDATE Paychecks SET gross_pay = ?, net_pay = ? WHERE id = ? AND fk_Lecturerusername = ?`,
        [gross_pay, net_pay, id, username]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Paycheck not found or does not belong to this lecturer." });
      }
      res.status(200).json({ message: "Paycheck updated successfully." });
    } catch (error) {
      console.error("Error updating paycheck:", error);
      res.status(500).json({ error: "Failed to update paycheck." });
    }
  };