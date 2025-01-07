import mongoose from "mongoose";
import dotenv from "dotenv";    
dotenv.config();
const connectDB = async () => {
    try {
        mongoose.set('bufferCommands', false);
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("DB connected");
    } catch (error) {
        console.log(error);
    }
};
export default connectDB;