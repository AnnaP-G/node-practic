import fs from "fs/promises";
import path from "path";

const PRODUCTS_PATH_DB = path.resolve("db", "products.json");

// get products
const getProducts = async () => {
  const products = await fs.readFile(PRODUCTS_PATH_DB);
  const parsedProducts = JSON.parse(products);
  return parsedProducts;
};

getProducts();
// post products
// update products
// delete products
