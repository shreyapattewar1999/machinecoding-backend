import express from "express";

import {
  fetchItems,
  addItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";
import isAdmin from "../middlewear/checkIsAdmin.js";
import authUser from "../middlewear/authUser.js";

const itemRouter = express.Router();

// admin and customer items present
itemRouter.post("/", authUser, fetchItems);

itemRouter.post("/addItem", authUser, isAdmin, addItem);

itemRouter.put("/:id", authUser, isAdmin, updateItem);

itemRouter.post("/deleteItem/:id", authUser, isAdmin, deleteItem);

export default itemRouter;
