import { Router } from "express";
// import { addProduct, getProducts } from "../controllers/productsControllers.js";
import * as c from "../controllers/productsControllers.js";


export const productsRouter = Router();

productsRouter.get("/", c.getProducts);
productsRouter.post("/", c.addProduct);
