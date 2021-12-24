import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
console.log("bruh0");
export default async function handler(req, res) {
  console.log("bruh1");
  verify(
    req.cookies.auth,
    "f55a10c4-50f9-441c-9a88-ea7af9997bbe",
    async function (err, decoded) {
      if (!err && decoded) {
        console.log("bruh1");
        res.status(200).json({ message: false });
      }
      console.log("bruh2");
      res.status(200).json({ message: true });
    }
  );
}
