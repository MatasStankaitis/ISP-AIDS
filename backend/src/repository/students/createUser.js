import connection from "#config/sqlConnection.js";
import argon2 from "argon2";

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
    const password_hash = await argon2.hash("password");
    const [results, fields] = await connection.execute(
      `INSERT INTO Users (password_hash, username, name, surname, phone_number, email, home_address, gender)
        VALUES 
        (?,?, ?, ?, ?, ?, ?, ?)`,
      [
        password_hash,
        username,
        name,
        surname,
        phone_number,
        email,
        home_address,
        gender,
      ]
    );
  } catch (err) {
    console.log(err);
    throw new Error(
      "failed to create user. User with this username might already exist"
    );
  }
};
