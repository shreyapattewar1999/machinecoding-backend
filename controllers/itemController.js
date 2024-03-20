import itemModel from "../models/item.js";

const fetchItems = async (req, res) => {
  try {
    const items = await itemModel.find();
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unexpected error" });
  }
};

const addItem = async (req, res) => {
  try {
    const { itemName, quantity, price } = req.body;
    if (!itemName || !quantity || !price) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const createdItem = await itemModel.create({
      name: itemName,
      quantity,
      price,
    });
    return res.status(201).json({ message: "Item added" });
  } catch {
    console.log(error);
    return res.status(400).json({ message: "Unexpected error" });
  }
};

const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    if (!itemId) {
      return res.status(400).json({ message: "Item ID missing" });
    }

    const itemToBeUpdated = await itemModel.findById(itemId);
    if (!itemToBeUpdated) {
      return res.status(400).json({ message: "Item ID is invalid" });
    }

    const { itemName, quantity, price } = req.body;
    if (!itemName || !quantity || !price) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const updatedItem = await itemModel.findByIdAndUpdate(
      itemId,
      {
        $set: { name: itemName, quantity: quantity, price: price },
      },
      { new: true }
    );
    return res
      .status(204)
      .json({ message: "Item updated", updatedItem: updatedItem });
  } catch {
    console.log(error);
    return res.status(400).json({ message: "Unexpected error" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    if (!itemId) {
      return res.status(400).json({ message: "Item ID missing" });
    }
    console.log(itemId);

    const itemToBeDeleted = await itemModel.findById(itemId);
    console.log(itemToBeDeleted);
    if (!itemToBeDeleted) {
      return res.status(400).json({ message: "Item ID is invalid" });
    }

    await itemModel.findByIdAndDelete(itemId);
    return res.status(204).json({ message: "Item Deleted" });
  } catch {
    console.log(error);
    return res.status(400).json({ message: "Unexpected error" });
  }
};
export { fetchItems, addItem, updateItem, deleteItem };
