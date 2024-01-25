import mongoose from "mongoose";
import config from "../config/index.js";


export default async function connectDb() {
    try {

        await mongoose.connect(config.mongoUri);

        console.log("MongoDB connected");

    } catch (err) {
        console.error(err);
    }

}