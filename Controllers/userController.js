const User = require("../Models/User");
const bcrypt = require("bcrypt");

const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: lastYear }, // Filter data for the last year
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" }, // Extract the month from the "createdAt" field
        },
      },
      {
        $group: {
          _id: "$month",
          totalUsers: { $sum: 1 }, // Count the number of users in each month
        },
      },
      {
        $sort: { _id: 1 }, // Sort the results by month in ascending order
      },
    ]);

    // Create a more readable response format
    const formattedData = data.map((entry) => ({
      month: entry._id,
      totalUsers: entry.totalUsers,
    }));

    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    if (!users) return res.status(204).send({ message: "No users found." });
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "ID parameter is required" });
  console.log(req.user);
  console.log(req.params.id);

  if (req.user !== req.params.id && !req.roles.isAdmin)
    return res.sendStatus(401);

  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(500).json(e);
  }
};

const deleteUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "ID parameter is required" });
  console.log(req.user);
  console.log(req.params.id);

  if (req.user !== req.params.id && !req.roles.isAdmin)
    return res.sendStatus(401);

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res
        .status(204)
        .json({ message: `No User matches this ID ${req.body.id}.` });
    }
    res.status(200).json({
      success: `user with id: ${deletedUser._id} and username: ${deletedUser.username} has been deleted successfully`,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const getSingleUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "ID parameter is required" });
  console.log(req.user);
  console.log(req.params.id);

  if (req.user !== req.params.id && !req.roles.isAdmin)
    return res.sendStatus(401);

  try {
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
      return res
        .status(204)
        .json({ message: `No user matches this ID ${req.params.id}.` });
    }
    const { password: omittedPassword, ...userData } = user._doc;
    console.log(userData);
    res.status(200).json({ ...userData });
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUsers,
  getUserStats,
};
