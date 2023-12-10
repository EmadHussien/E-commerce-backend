const Order = require("../Models/Order");

const createOrder = async (req, res) => {
  if (
    !req.body.userID ||
    !req.body.products ||
    !req.body.amount ||
    !req.body.address
  )
    return res.status(400).json({ message: "Data is required" });

  if (req.user !== req.body.userID && !req.roles.isAdmin)
    return res.sendStatus(401);

  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Order ID is required" });
  console.log(req.user); // user id
  console.log(req.params.id); // order id

  try {
    const order = await Order.findOne({ _id: req.params.id }).exec();
    if (!order)
      return res
        .status(204)
        .json({ message: `No Order matches ID ${req.params.id}.` });

    for (const key in req.body) {
      order[key] = req.body[key];
    }

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (e) {
    res.status(500).json(e);
  }
};

const deleteOrder = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Order ID is required" });

  try {
    const order = await Order.findOne({ _id: req.params.id }).exec();
    if (!order)
      return res
        .status(204)
        .json({ message: `No Order matches this ID ${req.params.id}.` });

    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (deletedOrder) {
      res.status(200).json({
        success: `Product with id: ${deletedOrder._id} has been deleted successfully`,
      });
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

const getUserOrders = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID is required" });
  if (req.user !== req.params.id && !req.roles.isAdmin)
    return res.sendStatus(401);
  try {
    const orders = await Order.find({ userID: req.params.id }).exec();
    res.status(200).json(orders);
  } catch (e) {
    res.status(500).json(e);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().exec();
    res.status(200).json(orders);
  } catch (e) {
    res.status(500).json(e);
  }
};

const getOrderStats = async (req, res) => {
  const productID = req.query.productId;
  const date = new Date();
  const lastMonth = new Date(new Date().setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productID && {
            products: { $elemMatch: { productID } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    // Create a more readable response format
    const formattedData = income.map((entry) => ({
      month: entry._id,
      totalIncome: entry.total,
    }));

    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAllOrders,
  getOrderStats,
};
