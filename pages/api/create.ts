import getProperty from "../../controllers/getProperty";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticated } from "./getProfile";
export default authenticated(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(500).json({ message: "only GET requests" });
  } else {
    // const result = await getAllProperties(req, res);
    res.status(200).json({ msg: "nothing" });
  }
  // res.status(200).json(result);
});
