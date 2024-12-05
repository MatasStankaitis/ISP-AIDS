import { getStudents } from "../repository/getStudents.js";

export const getStudentsController = async (req, res) => {
  try {
    const { name, surname, facultyId, year, academicGroupId } = req.query;

    const students = await getStudents(
      name,
      surname,
      facultyId,
      year,
      academicGroupId
    );
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};
