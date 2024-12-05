import { createStudent } from "../repository/createStudent.js";
import { createUser } from "../repository/createUser.js";
import { deleteUser as deleteUser } from "../repository/deleteStudent.js";
import { getStudent } from "../repository/getStudent.js";
import { getStudents } from "../repository/getStudents.js";
import { updateStudent } from "../repository/updateStudent.js";

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

export const getStudentByUsernameController = async (req, res) => {
  try {
    const { username } = req.params;

    const student = await getStudent(username);
    const studentFound = student.length === 1;

    res.status(studentFound ? 200 : 404).json(student);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

export const deleteStudentController = async (req, res) => {
  try {
    const { username } = req.params;

    const success = await deleteUser(username);

    res.status(success ? 200 : 400).json({ success: success });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

export const postStudentController = async (req, res) => {
  try {
    let createStudentSuccess = false;
    let createUserSuccess = false;

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

    createUserSuccess = await createUser(
      username,
      name,
      surname,
      phone_number,
      email,
      home_address,
      gender
    );

    if (createUserSuccess) {
      createStudentSuccess = await createStudent(
        username,
        year,
        state_funded,
        fk_Facultyid,
        fk_Groupid
      );
    }

    res
      .status(createStudentSuccess ? 200 : 400)
      .json({ success: createStudentSuccess });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

export const putStudentController = async (req, res) => {
  try {
    let updateSuccess = false;

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

    res.status(updateSuccess ? 200 : 400).json({ success: updateSuccess });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};
