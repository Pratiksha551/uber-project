
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { geoLocationSchema } from "./geoLocation.model.js";

// Define the schema for Captain (Driver)
const captainSchema = new mongoose.Schema({
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true, lowercase: true },

    mobileno: { type: String, required: true, unique: true },

    dob: { type: Date, required: true },

    // Geolocation for captain's current or registered location
    location: {
        type:geoLocationSchema,
        required: true
    },

    address: { type: String, required: true },

    profilePic: { type: String },

    vehicleType: {
        type: String,
        enum: ['Auto', 'TwoWheeler', 'Car'], 
        required: true
    },

    vehiclePic: { type: String },

    vehicleNo: { type: String, required: true, unique: true },

    drivingLicenceNo: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Blocked'], 
        default: 'Pending' 
    },
    isOnline: { type: Boolean, default: false }

}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

// Pre-save hook to hash password before saving to database
captainSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10); // Hashing with salt rounds = 10
    }
    next(); // Proceed to save
});

// Adds an instance method to compare entered password with the stored hashed password [custom method]
captainSchema.methods.compairePassword = async function (password) {
    return bcrypt.compare(password, this.password); // Returns true or false
};

// Export the Captain model for use in routes/controllers
export default mongoose.model('Captain', captainSchema);
