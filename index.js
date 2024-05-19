import { program } from "commander";
import { getProducts, addProduct } from "./services/productsServices.js";

program
  .option("--first")
  .option("-s, --separator <char>")
  .option("-a, --action <char>")
  .option("-n, --name <char>")
  .option("-p, --price <type>");

program.parse();

const options = program.opts();
console.log(options);

const handleServices = async ({ action, name, price }) => {
  switch (action) {
    case "get":
      const products = await getProducts();
      console.log(products);
      break;
    case "add":
      const product = await addProduct({ name, price });
      console.log(product);

      break;
  }
};

handleServices(options);
