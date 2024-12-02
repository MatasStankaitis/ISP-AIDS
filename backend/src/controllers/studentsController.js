import { getStudents } from "../repositroy/getStudents.js";

export const getStudentsController = async (req, res) => {
  const students = await getStudents();
  res.status(201).json(students);
};
