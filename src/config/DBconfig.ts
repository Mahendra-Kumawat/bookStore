import mongoose from "mongoose";
import { config } from "./config";

const DB_URI = config.dbURI;

const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URI as string);
        console.log("collection name ====> ", mongoose.connection.name);
        console.log("Connected to the database successfully");
    } catch (error) {
        throw error; // Re-throw the error to handle it in the calling function
    }
};

export { connectToDB };
