const { CLOUDINARY } = require('@config/index');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Cloudinary configuration
cloudinary.config({
  cloud_name: CLOUDINARY.cloud_name,
  api_key: CLOUDINARY.api_key,
  api_secret: CLOUDINARY.api_secret,
});


const uploadOnCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.secure_url;  // Return the Cloudinary file URL
  } catch (error) {
    fs.unlinkSync(filePath);
    throw new Error('Cloudinary upload failed: ' + error.message);
  }
};
module.exports = { uploadOnCloudinary };
