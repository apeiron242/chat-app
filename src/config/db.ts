import mysql from "mysql";

require("dotenv").config();

const db: mysql.Connection = mysql.createConnection({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
});

export default db;
