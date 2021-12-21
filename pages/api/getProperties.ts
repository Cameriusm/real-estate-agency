import getAllProperties from "../../controllers/getProperties";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(500).json({ message: "only GET requests" });
  } else {
    // const result = await getAllProperties(req, res);
    getAllProperties(req, res);
    // res.status(200).json({
    //   hits: [
    //     {
    //       id: "1",
    //       price: "5",
    //       area: "5",
    //       title: "house",
    //       agency: {
    //         logo: {
    //           url: "https://bayut-production.s3.eu-central-1.amazonaws.com/image/27769554/822a0ada129b4039b81c38d1dedeb2ed",
    //         },
    //       },
    //       rooms: "5",
    //       baths: "1",
    //       sqft: "5",
    //       rentFrequency: "daily",
    //       isVerified: true,
    //       coverPhoto: {
    //         url: "https://bayut-production.s3.eu-central-1.amazonaws.com/image/27769554/822a0ada129b4039b81c38d1dedeb2ed",
    //       },
    //     },
    //   ],
    // });
  }
  // res.status(200).json(result);
}
