import { getStudents } from "../repositroy/getStudents.js";

export const getStudentsController = async (req, res) => {
  const name = req.query.name;
  const surname = req.query.surname;
  const facultyId = req.query.facultyId;
  const year = req.query.year;
  const academicGroupId = req.query.academicGroupId;

  const students = await getStudents(
    name,
    surname,
    facultyId,
    year,
    academicGroupId
  );
  res.status(201).json(students);
};
