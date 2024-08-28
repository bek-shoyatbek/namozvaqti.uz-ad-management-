import mongoose from "mongoose";

import config from "../../config/index.js";

const connectDb = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB Atlas", err);
  }
};

export default connectDb;
