import express from "express";
import { registerUser } from "../controllers/userController.js";
import verifyUser from "../middlewear/authUser.js";

const userRouter = express.Router();

userRouter.post("/signIn", verifyUser, (req, res) => {
  return res.status(200).json({ message: "authenticated" });
});

userRouter.post("/registerUser", registerUser);

export default userRouter;
