import { v2 as cloudinary } from "cloudinary";

//configure
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// const image = "./images/cake.jpg";

//uploader
export const runCloudinaryUploader = async (image_path) => {
  console.log("started running cloudinary");
  try {
    const result = await cloudinary.uploader.upload(image_path);
    console.log(result.secure_url);
    return result.secure_url;
  } catch(error){
    console.log("error uploading image to cloudinary", error);
  }
};

// runCloudinaryUploader(image)