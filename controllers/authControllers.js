import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export const registerUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({
      status: 201,
      message: "Successfully register user",
      data: {
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};
