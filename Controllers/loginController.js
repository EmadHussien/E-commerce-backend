const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required." });
  }
  const foundUser = await User.findOne({ username }).exec();
  //console.log(foundUser._id.toString());
  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  const matchingPwd = await bcrypt.compare(password, foundUser.password);
  if (matchingPwd) {
    const roles = { isAdmin: foundUser.isAdmin };
    // Generate Access and refresh Tokens
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser._id.toString(),
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "40s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    try {
      foundUser.refreshToken = refreshToken;
      console.log(foundUser);
      const result = await foundUser.save();
      //console.log(result);

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      //      res.status(200).json({ acessToken });
      const {
        password: omittedPassword,
        refreshToken: refToken,
        ...userData
      } = foundUser._doc;
      console.log(userData);

      res.status(200).json({ ...userData, accessToken });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized." });
  }
};

module.exports = { handleLogin };
