// import { v2 as cloudinary } from "cloudinary";
// import multer from 'multer';
// import {CloudinaryStorage} from 'multer-storage-cloudinary';

// //configure
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
//   secure: true,
// });

// //storage
// const cloudinary_storage = new CloudinaryStorage ({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'fund-for-all-images', //name of folder in cloudinary cloud
//   }
// });

// //multer uploader
// export const upload = multer({ storage: cloudinary_storage});