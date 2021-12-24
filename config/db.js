const { createPool } = require("mysql");

const pool = createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "bbe047692780c1",
  password: "f2adbfc7",
  port: "3306",
  database: "heroku_13d5c1ee94b4df2",
});

pool.getConnection((err) => {
  if (err) {
    console.log("Error connecting to db", err);
  } else {
    console.log("connected to DB");
  }
});

module.exports = pool;
