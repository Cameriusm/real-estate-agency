const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "root",
  port: "3306",
  database: "realestate",
});

pool.getConnection((err) => {
  if (err) {
    console.log("Error connecting to db", err);
  } else {
    console.log("connected to DB");
  }
});

module.exports = pool;
