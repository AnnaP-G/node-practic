import express from "express";
import cors from "cors";
import pino from "pino-http";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import mongoose from "mongoose";
import "dotenv/config";
import { productsRouter } from "./routers/productsRouter.js";
import { authRouter } from "./routers/auth.js";
import { createFolderIfDoesNotExist } from "./utils/createFolder.js";
import path from 'node:path';
import { TEMP_DIR_PATH } from "./constants/index.js";

const { PORT, DB_HOST } = process.env;

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );
  app.use(express.static("public"));
  app.use("/api/auth", authRouter);
  app.use("/api/products", productsRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

const startServer = async () => {
  try {
    await mongoose
      .connect(DB_HOST)
    await createFolderIfDoesNotExist(TEMP_DIR_PATH);
    setupServer().listen(PORT, () =>
      console.log(`server started on port ${PORT}`)
    )
  } catch (err) {
    console.log("DB connection failed or server not started!");
    process.exit(1);
  }
}
startServer();