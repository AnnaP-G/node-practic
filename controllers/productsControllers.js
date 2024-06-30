import fs from 'fs/promises';
import { Product } from '../models/product.js';
import createHttpError from 'http-errors';
import path from "node:path";

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

export const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!Object.keys(req.body).length && !req.files.length) {
      throw createHttpError(400, 'Product has no data');
    }

    const file0 = req.files[0];
    await fs.rename(file0.path, path.resolve("public/products/", file0.filename))
    const product = await Product.findByIdAndUpdate(productId, req.body, { new: true, projection: "-__v" });

    res.status(200).json({
      status: 200,
      message: ' Successfully updated product!',
      data: product,
    });
  } catch (err) {
    next(err);
  }
};
// {
//   fieldname: 'productImages',
//   originalname: 'avatar.avif',
//   encoding: '7bit',
//   mimetype: 'image/avif',
//   destination: '/Users/ivasiunkoruslan/Documents/GitHub/Type-Script/node-practic/temp',
//   filename: '666ef77175388ae58465d48e_GPD5X_G-rwITRTx8CTe3g.avif',
//   path: '/Users/ivasiunkoruslan/Documents/GitHub/Type-Script/node-practic/temp/666ef77175388ae58465d48e_GPD5X_G-rwITRTx8CTe3g.avif',
//   size: 16696
// },