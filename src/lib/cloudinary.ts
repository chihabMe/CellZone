import { v2 as cloudinary_v2 } from "cloudinary";

export const cloudinary = cloudinary_v2.config({
  cloud_name: process.env.CLOUDINARY_name,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
