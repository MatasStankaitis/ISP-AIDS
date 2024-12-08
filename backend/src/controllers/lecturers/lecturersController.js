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
