const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    products: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
