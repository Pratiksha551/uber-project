import app from "./app.js";
import { connectDB } from "./config/database.js";

const startServer = async() => {
    try {
        await connectDB()
       app.listen(8000,() => {
        console.log("Server running.....");
        
       }) 
    } catch (error) {
        console.log("ERROR")
    }
}

startServer()