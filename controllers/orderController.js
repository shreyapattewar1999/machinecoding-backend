import userModel from "../models/user.js";
import orderModel from "../models/order.js";

const fetchOrders = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await userModel.find({ name: name });
    if (user.role === "admin") {
      // if user is admin then, he can view all the orders
      const orders = await orderModel.find();
      return res.status(200).json(orders);
    } else {
      const orders = await orderModel.find({ user: user._id });
      return res.status(200).json(orders);
    }
  } catch (err) {
    return res.status(400).json({ message: "Unexpected Error" });
  }
};

const createOrder = async (req, res) => {
  try {
    // const {user, itemsOrdered, orderedQuantity} = req.body;
    // user --> userId

    await orderModel.create(req.body);
    return res.status(200).json({ message: "Order is created" });
  } catch (err) {
    return res.status(400).json({ message: "Unexpected Error" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(400).json({ message: "Please enter valid orderId" });
    }

    const { userId, itemId, quantity } = req.body;

    const query = {
      $and: [
        {
          user: userId,
        },
        {
          itemOrdered: itemId,
        },
      ],
    };

    // here we assume that customer can update quantity of item in a order

    const updatedOrder = await orderModel.findAndUpdate(
      query,
      {
        $set: {
          orderedQuantity: quantity,
        },
      },
      { new: true }
    );

    return res.status(200).json(updatedOrder);
  } catch (err) {
    return res.status(400).json({ message: "Unexpected Error" });
  }
};

// only admin can delete order
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    await orderModel.findByIdAndDelete(orderId);
  } catch (err) {
    return res.status(400).json({ message: "Unexpected Error" });
  }
};

export { fetchOrders, createOrder, updateOrder, deleteOrder };
