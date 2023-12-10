const User = require("../Models/User");
const bcrypt = require("bcrypt");
const Cart = require("../Models/Cart");

const handleNewUser = async (req, res) => {
  const { username, email, password, img } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "username and email and password are all required." });
  }
  const checkDuplicate = await User.findOne({ username: username }).exec();
  if (checkDuplicate) {
    return res.status(409).json({ message: "Username already taken." });
  }
  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPwd,
      img: img || "",
    });

    // Create an empty cart for the new user
    const newCart = new Cart({
      userID: newUser._id,
      products: [],
    });
    const savedCart = await newCart.save();

    const { password: omittedPassword, ...userData } = newUser._doc;
    console.log(userData);
    res.status(201).json({ ...userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { handleNewUser };
