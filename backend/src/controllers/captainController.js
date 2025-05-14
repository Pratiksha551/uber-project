import { Captain } from '../models/index.js';
import sendMail from '../utils/mail.js';

// register
export const registerCaptain = async (req, res) => {
  const {
    name,
    email,
    password,
    mobileno,
    dob,
    location,
    vehicleType,
    drivingLicenceNo,
    address,
    vehicleNo
  } = req.body;

  try {
    const findCaptain = await Captain.findOne({ email });

    if (findCaptain) {
      return res.send({ success: false, message: "User already exists!" });
    }

    // File uploads (safe access)
    const profilePic = req?.files?.profilePic?.[0]?.filename || '';
    const vehiclePic = req?.files?.vehiclePic?.[0]?.filename || '';

    // Fix formats
    const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;
    const trimmedVehicleType = vehicleType?.trim();
    const parsedDOB = new Date(dob);

    const captain = new Captain({
      name,
      email,
      mobileno,
      dob: parsedDOB,
      location: parsedLocation,
      address,
      profilePic,
      vehicleType: trimmedVehicleType,
      vehiclePic,
      vehicleNo,
      drivingLicenceNo,
      password
    });

    await captain.save();

    await sendMail({
      to: email,
      subject: "Captain Registration",
      text: `Hi ${name}, your captain registration is pending approval.`
    });
    console.log("Data",captain);
    
    res.send({
      success: true,
      message: "Captain registered successfully."
    });
  } catch (err) {
    res.send({
      success: false,
      message: "Server Error!"
    });
  }
};
