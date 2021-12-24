import pool from "../config/db";
import { hash } from "bcrypt";
const signUp = (req, res) => {
  const {
    name,
    second_name,
    verified = 0,
    phone_number,
    email,
    password,
  } = req.body;
  hash(password, 10, async function (err, hash) {
    pool.query(`SELECT * FROM owner WHERE email='${email}'`, (req, result) => {
      console.log(result);
      if (result == undefined || result.length == 0) {
        pool.query(
          `INSERT INTO owner (name, second_name, verified, phone_number, email, password) values ('${name}', '${second_name}', '${verified}', '${phone_number}', '${email}', '${hash}')`,
          (err, result) => {
            if (err) {
              console.log(err);
              res.send([false]);
            } else {
              pool.query(`SELECT * FROM owner`, (err, result) => {
                if (err) {
                  console.log(err);
                  res.send([false]);
                } else {
                  res.send({ result });
                }
              });
            }
          }
        );
      } else {
        console.log("same email", result);
        res.send({ message: "Same email" });
      }
    });
  });
};

export default signUp;
