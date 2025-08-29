import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });
    // Check stock
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${item.product.name}` });
      }
    }
    // Deduct stock
    for (const item of cart.items) {
      item.product.stock -= item.quantity;
      await item.product.save();
    }
    const total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const order = await Order.create({
      user: req.user.id,
      items: cart.items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
      })),
      total,
    });
    cart.items = [];
    await cart.save();
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "items.product"
    );
    res.json(orders);
  } catch (err) {
    next(err);
  }
};
