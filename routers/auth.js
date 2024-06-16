import { Router } from "express";
import { registerUserController } from "../controllers/authControllers.js";

export const authRouter = Router();

authRouter.post("/register", registerUserController);
// authRouter.post("/");
