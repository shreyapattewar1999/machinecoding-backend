import express from "express";

import {
  fetchOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

import verifyUser from "../middlewear/authUser.js";
import checkIsAdmin from "../middlewear/checkIsAdmin.js";

const orderRouter = express.Router();

orderRouter.get("/", verifyUser, fetchOrders);

orderRouter.post("/", verifyUser, createOrder);

orderRouter.put("/:id", verifyUser, updateOrder);

orderRouter.delete("/:id", verifyUser, checkIsAdmin, deleteOrder);

export default orderRouter;
