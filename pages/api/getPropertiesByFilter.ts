import getPropertiesByFilters from "../../controllers/getPropertiesByFilters";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(500).json({ message: "only GET requests" });
  } else {
    // const result = await getAllProperties(req, res);
    getPropertiesByFilters(req, res);
  }
  // res.status(200).json(result);
}
