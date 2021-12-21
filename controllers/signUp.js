import pool from "../config/db";
import mysql from "mysql";
import { hash } from "bcrypt";
const signUp = (req, res) => {
  // res.send("Done Successfuly");
  //   console.log(req);
  const {
    name,
    second_name,
    verified = 0,
    phone_number,
    email,
    password,
  } = req.body;
  hash(password, 10, async function (err, hash) {
    // console.log(perPage);
    pool.query(
      `INSERT INTO owner (name, second_name, verified, phone_number, email, password) values ('${name}', '${second_name}', '${verified}', '${phone_number}', '${email}', '${hash}')`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.send([false]);
        } else {
          // const property = result;
          pool.query(`SELECT * FROM owner`, (err, result) => {
            if (err) {
              console.log(err);
              res.send([false]);
            } else {
              res.send({ result });
            }
          });
          // const property = { hits: result };
          // res.send({ hits: result });
        }
      }
    );
  });
};

export default signUp;
