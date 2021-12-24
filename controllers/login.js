import pool from "../config/db";
import mysql from "mysql";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from "cookie";
const login = (req, res) => {
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

  // console.log(perPage);
  pool.query(`SELECT * FROM owner WHERE email = '${email}'`, (err, result) => {
    if (err) {
      console.log(err);
      res.send([false]);
    } else {
      const owner = result;
      console.log("owner", owner);
      console.log("owner", password);
      console.log("notteach", owner[0].password);
      if (owner[0].password === undefined) {
        res.send({ message: false });
      }
      console.log(owner[0].password);
      compare(password, owner[0].password, function (err, result) {
        if (!err && result) {
          const claims = { sub: owner.id, MyPersonEmail: owner.email };
          const jwt = sign(claims, "f55a10c4-50f9-441c-9a88-ea7af9997bbe");

          res.setHeader(
            "Set-Cookie",
            cookie.serialize("auth", jwt, {
              httpOnly: true,
              sameSite: true,
              maxAge: 3600000,
              path: "/",
            })
          );
          res.json({ owner: owner });
        } else {
          console.log(err);
          res.json({ message: "Falses" });
        }
      });
      // const property = { hits: result };
      // res.send({ hits: result });
    }
  });
};

export default login;
