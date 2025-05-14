import dotenv from 'dotenv';
dotenv.config();

export const config = {
    mongoUrl: process.env.MONGO_URI ,// Fixed environment variable name
    fileUploadPath: process.env.FILE_UPLOAD,
    apiKey: process.env.APP_KEY,
    secretKey: process.env.SECRET_KEY
};

console.log("MONGO_URI:", process.env.MONGO_URI);