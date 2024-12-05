import connection from "../sqlConnection.js";
import { NotFoundError } from "../utils/errors.js";

export const updateStudent = async (
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
) => {
  try {
    const [results, fields] = await connection.execute(
      `UPDATE Users 
      INNER JOIN Students ON Students.username=Users.username
      SET Users.name=?, Users.surname=?, Users.phone_number=?, Users.email=?, Users.home_address=?, Users.gender=?, Students.year=?, Students.state_funded=?, Students.fk_Facultyid=?, Students.fk_groupid=?
        WHERE Users.username=?`,
      [
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
        username,
      ]
    );
    if (results.affectedRows <= 0) {
      throw new NotFoundError("user not found");
    }
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    console.log(err);
    throw new Error("failed to update student");
  }
};
