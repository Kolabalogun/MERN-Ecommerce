import mongoose from "mongoose";
import Product from "../model/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields." });
  }

  try {
    const newProduct = new Product(product);

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product saved successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log("Error while trying to create product", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error " + error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(404)
      .json({ success: false, message: "Invalid Product id:" + id });
  }

  try {
    const updatedProduct = await Product.findById(id, product, { new: true });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(404)
      .json({ success: false, message: "Invalid Product id:" + id });
  }

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: `Product deleted successfully ${id} ` });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server erroe", success: false });
  }
};
