import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./db.js";

import itemRouter from "./routes/itemRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/items", itemRouter);

app.listen(PORT, () => {
  connectToDB();
  console.log("app has started");
});
