import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectToDB;

// password: t4Z0s0Doj7V5vwPm;
// username: shreyapattewar1999;

// mongodb+srv://shreyapattewar1999:t4Z0s0Doj7V5vwPm@cluster0.4inmq6y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
