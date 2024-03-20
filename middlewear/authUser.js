import userModel from "../models/user.js";
import bcrypt from "bcrypt";

// export const verifyUser = async (name, password) => {
//   const isUserExist = await userModel.find({
//     name: name,
//   });
//   if (!isUserExist) {
//     return false;
//   }
//   const isPasswordValid = bcrypt.compare(password, isUserExist.password);
//   return isPasswordValid ? true : false;
// };

const verifyUser = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    console.log(req.body);
    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "Name and password are required fields" });
    }

    const isUserExist = await userModel.find({
      name: name,
    });
    console.log(isUserExist);
    if (!isUserExist) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    // console.log(isUserExist, password);
    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExist[0].password
    );
    if (isPasswordValid) {
      next();
    } else {
      return res.status(400).json({ message: "credentials invalid" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Unexpected error" });
  }
};

export default verifyUser;
