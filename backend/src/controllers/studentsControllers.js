import { SUCCESS_STATUS } from "../constants.js";
import { createStudent } from "../repository/createStudent.js";
import { createUser } from "../repository/createUser.js";
import { deleteUser as deleteUser } from "../repository/deleteStudent.js";
import { getStudent } from "../repository/getStudent.js";
import { getStudents } from "../repository/getStudents.js";
import { updateStudent } from "../repository/updateStudent.js";
import { studentCreateSchema } from "../schemas/studentCreateSchema.js";
import { studentUpdateSchema } from "../schemas/studentUpdateSchema.js";
import { ValidationError } from "../utils/errors.js";
import { handleError } from "../utils/handleError.js";

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

    res.status(SUCCESS_STATUS).json(students);
  } catch (err) {
    handleError(res, err);
  }
};

export const getStudentByUsernameController = async (req, res) => {
  try {
    const { username } = req.params;

    const student = await getStudent(username);
    const studentFound = student.length === 1;

    res.status(studentFound ? SUCCESS_STATUS : NOT_FOUND_STATUS).json(student);
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteStudentController = async (req, res) => {
  try {
    const { username } = req.params;

    await deleteUser(username);

    res.status(SUCCESS_STATUS).json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
};

export const postStudentController = async (req, res) => {
  try {
    const {
      username,
      name,
      surname,
      phone_number,
      email,
      home_address,
      gender,
      year,
      state_funded,
      fk_Facultyid,
      fk_Groupid,
    } = req.body;

    const { error, value } = studentCreateSchema.validate(req.body);
    if (error) {
      throw new ValidationError(error.details[0].message);
    }

    await createUser(
      username,
      name,
      surname,
      phone_number,
      email,
      home_address,
      gender
    );

    await createStudent(username, year, state_funded, fk_Facultyid, fk_Groupid);

    res.status(SUCCESS_STATUS).json({
      success: true,
      message: "successfully created a user",
    });
  } catch (err) {
    handleError(res, err);
  }
};

export const putStudentController = async (req, res) => {
  try {
    let updateSuccess = false;
    const { username } = req.params;
    const {
      name,
      surname,
      phone_number,
      email,
      home_address,
      gender,
      year,
      state_funded,
      fk_Facultyid,
      fk_Groupid,
    } = req.body;

    const { error, value } = studentUpdateSchema.validate(req.body);
    if (error) {
      throw new ValidationError(error.details[0].message);
    }

    updateSuccess = await updateStudent(
      username,
      name,
      surname,
      phone_number,
      email,
      home_address,
      gender,
      year,
      state_funded,
      fk_Facultyid,
      fk_Groupid
    );

    res.status(SUCCESS_STATUS).json({ success: updateSuccess });
  } catch (err) {
    handleError(res, err);
  }
};
