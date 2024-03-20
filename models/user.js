import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "customer",
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
