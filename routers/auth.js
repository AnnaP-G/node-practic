import { Router } from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/authControllers.js";

export const authRouter = Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);
