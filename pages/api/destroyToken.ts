import getProfile from "../../controllers/getProfile";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import cookie from "cookie";
export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(
      req.cookies.auth!,
      "f55a10c4-50f9-441c-9a88-ea7af9997bbe",
      async function (err, decoded) {
        if (!err && decoded) {
          return await fn(req, res);
        }
        console.log("verified");
        res.status(401).json({ message: "No auth" });
      }
    );
  };

export default authenticated(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(500).json({ message: "only POST requests" });
  } else {
    //   res.clearCookies()
    // const result = await getAllProperties(req, res);
    // getProfile(req, res);
    // res.clear;
    res.setHeader("Set-Cookie", [
      cookie.serialize("auth", "", {
        maxAge: -1,
        path: "/",
      }),
    ]);
    console.log("destroyed");
    res.send(200);
    console.log(req.cookies);
    // req.cookies.
    // req.cookies
    // res.clearCookie("key");
  }
  // res.status(200).json(result);
});
