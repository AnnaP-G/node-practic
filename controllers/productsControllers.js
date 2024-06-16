import { Product } from '../models/product.js';

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('owner', '-password -__v');
    res.json({
      status: 200,
      message: ' Successfully get all products!',
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const product = await Product.create({ ...req.body, owner: req.userId });
    res.status(201).json({
      status: 201,
      message: ' Successfully created product!',
      data: product,
    });
  } catch (err) {
    next(err);
  }
};
