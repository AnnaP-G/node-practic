import express from "express";
import cors from "cors";
import pino from "pino-http";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import mongoose from "mongoose";
import "dotenv/config";
import { productsRouter } from "./routers/productsRouter.js";
import { authRouter } from "./routers/auth.js";
// import {PORT} from ''

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
  app.use("/api/auth", authRouter);
  app.use("/api/products", productsRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

mongoose
  .connect(DB_HOST)
  .then(() => {
    setupServer().listen(PORT, () =>
      console.log(`server started on port ${PORT}`)
    );
  })
  .catch(() => {
    console.log("DB connection failed");
    process.exit(1);
  });
