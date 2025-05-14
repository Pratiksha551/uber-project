import { config } from './env.js'; // Corrected import
import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUrl);
        console.log("DB connected...");
    } catch (error) {
        console.error("DB Connection failed:", error); // Improved error logging
    }
};