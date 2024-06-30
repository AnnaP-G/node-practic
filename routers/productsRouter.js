import { Router } from 'express';
// import { addProduct, getProducts } from "../controllers/productsControllers.js";
import * as c from '../controllers/productsControllers.js';
import { authenticateAccessToken } from '../middlewares/authenticateAccessToken.js';

export const productsRouter = Router();

productsRouter.post('/', authenticateAccessToken, c.addProduct); // body={name: "", price: ""}
productsRouter.get(
	'/',
	// authenticateAccessToken,
	c.getProducts
);
productsRouter.patch(
	'/:productId',
	// authenticateAccessToken,
	c.updateProduct
);

// const addProductFromFront = (productData, token) => {
//   const p = axios.post('http://localhost:3000/api/product', productData, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
// };
