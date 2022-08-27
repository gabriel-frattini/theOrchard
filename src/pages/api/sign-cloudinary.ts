import { v2 as cloudinary } from "cloudinary";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  timestamp: number;
  folder: string;
  signature: string;
  apiKey: string;
  cloudName: string;
};

type Error = {
  message: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const cloudName = cloudinary.config().cloud_name!;
const apiSecret = cloudinary.config().api_secret!;
const apiKey = cloudinary.config().api_key!;
const folder = "sideclub";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  const token = req.cookies["admin-token"];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder,
      image_metadata: true,
    },
    apiSecret
  );

  res.status(200).json({ timestamp, folder, signature, apiKey, cloudName });
}
