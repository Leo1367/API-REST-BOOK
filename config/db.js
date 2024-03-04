import mongoose from 'mongoose';
import { config } from 'dotenv';

config()

const dbURL = "mongodb://localhost:27017";

const conectDB = async () => {
    try {
        mongoose.connect(dbURL);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

export default conectDB;