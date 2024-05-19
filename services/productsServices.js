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

const addProduct = async ({ name, price }) => {
  const products = await getProducts();
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    discount: 0,
  };
  products.push(newProduct);
  await fs.writeFile(PRODUCTS_PATH_DB, JSON.stringify(products, null, 2));
  return newProduct;
};

addProduct({ name: "laptop", price: 3000 });
// update products
// delete products
