import userModel from "../models/user.js";

const isAdmin = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await userModel.find({ name: name });
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }
    if (user[0].role !== "admin") {
      return res.status(403).json({ message: "Insufficient Permissions" });
    }
    console.log("admin authenticated");
    next();
  } catch (errr) {
    return res.status(400).json({ message: "Unexpected error" });
  }
};

export default isAdmin;
