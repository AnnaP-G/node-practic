import express from "express";
import cors from "cors";
import pino from "pino-http";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

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

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

const port = 3000;
setupServer().listen(port, () => console.log(`server started on port ${port}`));
