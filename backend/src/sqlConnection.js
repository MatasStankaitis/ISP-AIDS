import mysql from "mysql2/promise";

async function createConnection() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "isp",
      password: "password",
      port: 3306,
    });
    return connection; // You can return the connection here if needed
  } catch (err) {
    console.log(err);
    throw err;
  }
}
const connection = await createConnection();

export default connection;
