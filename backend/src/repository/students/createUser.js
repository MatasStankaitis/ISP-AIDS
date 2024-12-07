import connection from "#config/sqlConnection.js";

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
  } catch (err) {
    console.log(err);
    throw new Error(
      "failed to create user. User with this username might already exist"
    );
  }
};
