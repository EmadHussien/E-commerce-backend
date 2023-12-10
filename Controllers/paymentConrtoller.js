const stripe = require("stripe")(process.env.STRIPE_KEY);
const Order = require("../Models/Order");

const pay = async (req, res) => {
  const orderData = {
    userID: req.user,
    products: req.body.products,
    amount: req.body.amount / 100,
    address: req.body.address,
    username: req.body.username,
    userImg: req.body.img,
  };
  try {
    // Create a payment using Stripe
    const stripeRes = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    });

    // If payment is successful, attempt to create the order
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();

    // Send a response with the saved order and Stripe response
    res.status(200).json({ order: savedOrder, payment: stripeRes });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json(error.message || "Internal Server Error");
  }
};

module.exports = {
  pay,
};
