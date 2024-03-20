import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// const signInUser = async (req, res) => {
//   try {
//     const { name, password } = req.body;
//     if (!name || !password) {
//       return res
//         .status(400)
//         .json({ message: "Name and password are required fields" });
//     }

//     const isUserExist = verifyUser(name, password);
//     if (!isUserExist) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     return res.status(400).json({ message: "credentials validated" });
//   } catch (err) {
//     return res.status(400).json({ message: "Unexpected error" });
//   }
// };

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "Name and password are required fields" });
    }

    const isUserExistWithName = await userModel.find({ name: name });
    console.log(isUserExistWithName);
    if (isUserExistWithName.length > 0) {
      return res
        .status(400)
        .json({ message: "Please select different username" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(name, email, password, role, hashedPassword);
    await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });
    return res.status(200).json({ message: "User is created" });
  } catch (errr) {
    return res.status(400).json({ message: "Unexpected error" });
  }
};

export { registerUser };
