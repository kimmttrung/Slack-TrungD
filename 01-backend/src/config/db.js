import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URL);
        console.log("Connected successfully", conn.connection.host);
    } catch (error) {
        console.log("Erroe connecting to mongoose", error);
        process.exit(1);
    }
}