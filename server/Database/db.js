const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "t-from",
  waitForConnections: true,
});

module.exports = db;
