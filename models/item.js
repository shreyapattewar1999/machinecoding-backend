import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
});

const itemModel = mongoose.model("Item", itemSchema);
export default itemModel;
