import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  itemOrdered: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
  orderedQuantity: {
    type: Number,
    required: true,
  },
});

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
