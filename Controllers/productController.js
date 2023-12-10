const Product = require("../Models/Product");

const createProduct = async (req, res) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.img ||
    !req.body.price
  )
    return res.status(400).json({ message: "Data is required" });
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Product ID is required" });
  console.log(req.params.id);

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (e) {
    res.status(500).json(e);
  }
};

const getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    if (!products)
      return res.status(204).send({ message: "No products found." });
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleProduct = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "ID parameter is required" });

  try {
    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) {
      return res
        .status(204)
        .json({ message: `No product matches this ID ${req.params.id}.` });
    }
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json(e);
  }
};

const deleteProduct = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Product ID is required" });

  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res
        .status(204)
        .json({ message: `No Product matches this ID ${req.body.id}.` });
    }
    res.status(200).json({
      success: deletedProduct._id,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getAllProducts,
};
