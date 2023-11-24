const Cart = require("../Models/Cart");

const createCart = async (req, res) => {
  if (!req.body.userID || !req.body.products)
    return res.status(400).json({ message: "Data is required" });

  if (req.user !== req.body.userID && !req.roles.isAdmin)
    return res.sendStatus(401);

  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCart = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Cart ID is required" });
  console.log(req.user); // user id
  console.log(req.params.id); // cart id

  try {
    const cart = await Cart.findOne({ _id: req.params.id }).exec();
    if (!cart)
      return res
        .status(204)
        .json({ message: `No Cart matches ID ${req.params.id}.` });
    else if (req.user !== cart.userID && !req.roles.isAdmin)
      return res.sendStatus(401);

    for (const key in req.body) {
      cart[key] = req.body[key];
    }

    const updatedCart = await cart.save();

    res.status(200).json(updatedCart);
  } catch (e) {
    res.status(500).json(e);
  }
};

const deleteCart = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Cart ID is required" });

  try {
    const cart = await Cart.findOne({ _id: req.params.id }).exec();
    if (!cart)
      return res
        .status(204)
        .json({ message: `No Cart matches ID ${req.params.id}.` });
    else if (req.user !== cart.userID && !req.roles.isAdmin)
      return res.sendStatus(401);

    const deletedCart = await Cart.findByIdAndDelete(req.params.id);

    if (deletedCart) {
      res.status(200).json({
        success: `Product with id: ${deletedCart._id} has been deleted successfully`,
      });
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

const getUserCart = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID is required" });
  if (req.user !== req.params.id && !req.roles.isAdmin)
    return res.sendStatus(401);
  try {
    const cart = await Cart.findOne({ userID: req.params.id }).exec();
    res.status(200).json(cart);
  } catch (e) {
    res.status(500).json(e);
  }
};
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().exec();
    res.status(200).json(carts);
  } catch (e) {
    res.status(500).json(e);
  }
};
module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts,
};
