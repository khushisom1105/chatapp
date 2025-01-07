import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import {app,server} from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin:"http://localhost:8001",
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));   
app.use(cookieParser()); 

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/users",userRoutes);

const start= async()=>{   
    server.listen(PORT, () => {      
        console.log(`Server is running on port ${PORT}`);
    })  
    await connectDB();
}
start();
