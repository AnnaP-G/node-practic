import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: false,
    default: 0,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

export const Product = model('products', productSchema);
