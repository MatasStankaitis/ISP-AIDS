import connection from "../sqlConnection.js";
import { NotFoundError } from "../utils/errors.js";

export const getStudent = async (username) => {
  try {
    const [results, fields] = await connection.execute(
      `SELECT Users.username, Users.name, Users.surname, Users.phone_number, Users.email, Users.home_address, Users.gender, Students.year, Students.state_funded, Students.fk_Facultyid, Students.fk_Groupid 
      FROM Users 
      INNER JOIN Students ON Students.username=Users.username
      WHERE
      Users.username=?`,
      [username]
    );
    if (results.length > 0) {
      results[0].state_funded = results[0].state_funded ? true : false;
      return results;
    } else {
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
