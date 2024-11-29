const multer = require("multer");
const path = require("path");
const fs = require('fs');

// Set up the storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './public/uploads';
        // Ensure the uploads directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir); // Destination folder where files will be stored
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

// File validation to accept only jpeg, jpg, png, and pdf
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType) {
        return cb(null, true); // accept the file
    } else {
        return cb(new Error("Invalid file type! Only JPEG, PNG, PDF are allowed."), false); // reject the file
    }
};

// Multer upload setup
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 25 * 1024 * 1024 }, // Limit files to 25MB
}).array("documents");

module.exports = { upload };
