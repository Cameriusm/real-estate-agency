import signUp from "../../controllers/signUp";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(500).json({ message: "only POST requests" });
  } else {
    // const result = await getAllProperties(req, res);
    signUp(req, res);
  }
  // res.status(200).json(result);
}
