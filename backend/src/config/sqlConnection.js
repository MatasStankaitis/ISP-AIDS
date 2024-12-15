import mysql from "mysql2/promise";
import "dotenv/config";

async function createConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  });
  return connection; // You can return the connection here if needed
}
const connection = await createConnection();

export default connection;
