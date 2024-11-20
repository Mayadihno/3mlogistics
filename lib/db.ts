import mongoose from "mongoose";

async function dbConnect() {
  try {
    // Connect to the database
    const conn = await mongoose.connect(process.env.MONGODB_URI!);

    return conn;
  } catch (error) {
    console.log(error);
    throw new Error("Connection failed!");
  }
}

export default dbConnect;
