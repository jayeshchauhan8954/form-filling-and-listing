const dotenv = require('dotenv');
const path = require('path');

// Setup env
dotenv.config({
    path: path.resolve(__dirname, `../.env`)
});

module.exports = {
    // Server 
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 3000,
    ROOT_DIR: path.resolve('./'),
    API_VERSION: process.env.API_VERSION,

    // Default Secret Key For Auth Token
    JWT_SECRET_KEY: process.env.SECRET_KEY,

    DB: {
        connection_string: process.env.CONNECTION_STRING,
    },
    CLOUDINARY: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    }
}