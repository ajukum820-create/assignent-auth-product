import productModel from "../models/product.model.js";

//creat product controller
const createProductController = async (req, res) => {
  try {
    //============request body c data lena ================
    const { title, description, price, category, size, stock } = req.body;

    //create product data
    const product = await productModel.create({
      title,
      description,
      price,
      category,
      size,
      stock,
      createdBy: req.user.userId,
    });
    //return response
    return res.status(200).json({
      status: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

//Get all products controller---
const getAllProductController = async (req, res) => {
  try {
    //Data base c all products find karna or fetch karna
    const products = await productModel.find();
    if (!products) {
      return res.status(400).json({
        status: false,
        message: "No Product found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "All Products fectched successfully",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to fectched produts",
      error: error.message,
    });
  }
};

//get product by id

const getProductbyIdController = async (req, res) => {
  try {
    // read id from params
    const { id } = req.params;

    // find product by id in database
    const product = await productModel.findById(id);

    // agar product nahi mila
    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    // agar product mil gaya
    return res.status(200).json({
      status: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};



//update product controller
const updateProductController = async (req, res) => {
  try {
    // url c product id read karna

    const { id } = req.params;

    //logged in user ka id read karna

    const userId = req.user.userId;

    //phele product find karna kon ca product update kar rhe hai

    const product = await productModel.findById(id);

    // agar product nhi mila

    if (!product) {
      return res.status(400).json({
        status: false,
        message: "Product not found",
      });
    }
    //kya jeh product ese user ne crate kra ta
    if (product.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        status: false,
        message: "You are not allowed to update this product",
      });
    }

    //product update karna
    const updateProduct = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidation: true,
    });

    //return res
    return res.status(200).json({
      status: true,
      message: "Product create successfully",
      product: updateProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

//delete product controller
const deleteProudctController = async (req, res) => {
  try {
    //url se product id nikalan
    const { id } = req.params;
    //database c product id nilkana and delete karna
    const deleteProduct = await productModel.findByIdAndDelete(id);

    //AGar product exists nhi karta
    if (!deleteProduct) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }
    //res
    return res.status(200).json({
      status: true,
      message: "Product deleted successfully",
      product: deleteProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};
export {
  createProductController,
  getAllProductController,
  getProductbyIdController,
  updateProductController,
  deleteProudctController,
};
