import { type UploadApiResponse, v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName) {
  throw new Error("CLOUDINARY_CLOUD_NAME is not set");
}

if (!apiKey) {
  throw new Error("CLOUDINARY_API_KEY is not set");
}

if (!apiSecret) {
  throw new Error("CLOUDINARY_API_SECRET is not set");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export async function uploadImage(image: File): Promise<string> {
  const imageData = await image.arrayBuffer();

  const mime = image.type;
  const encoding = "base64";
  const base64Data = Buffer.from(imageData).toString("base64");

  const fileUri = `data:${mime};${encoding},${base64Data}`;

  const result: UploadApiResponse = await cloudinary.uploader.upload(fileUri, {
    folder: "nextjs-course-mutations",
  });

  return result.secure_url;
}
