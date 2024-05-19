import fs from "fs/promises";
import path from "path";

const PRODUCTS_PATH_DB = path.resolve("db", "products.json");

const writeProducts = async(products) => {
  await fs.writeFile(PRODUCTS_PATH_DB, JSON.stringify(products, null, 2));
}

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
  await writeProducts(products);
  return newProduct;
};

// addProduct({ name: "laptop", price: 3000 });
// update products

const updateProduct = async (id, data) => {
  const products = await getProducts();
  const productIndex = products.findIndex((product) => { return product.id === id })
  if (productIndex === -1) return null;
  products[productIndex] = {
    ... products[productIndex], ...data
  }
  await writeProducts(products);
}
updateProduct(1, {discount: 10})

// delete products
