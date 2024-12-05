import connection from "../sqlConnection.js";

export const createUser = async (
  username,
  name,
  surname,
  phone_number,
  email,
  home_address,
  gender
) => {
  try {
    const [results, fields] = await connection.execute(
      `INSERT INTO Users (username, name, surname, phone_number, email, home_address, gender)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?)`,
      [username, name, surname, phone_number, email, home_address, gender]
    );

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
