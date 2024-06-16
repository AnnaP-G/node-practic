import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { randomBytes } from "crypto";
import { Session } from "../models/session.js";
import { FIFTEEN_MINUTES } from "../constants/index.js";

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

export const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(400, "Email or password is exist");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw createHttpError(400, "Email or password is exist");
    }

    const accessToken = randomBytes(30).toString("base64");
    Session.create({
      userId: user._id,
      accessToken,
      accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    });
    res.json({
      status: 200,
      message: "Successfully logged in a user!",
      data: {
        accessToken,
        user: {
          name: user.name,
          email: user.email,
          avatar: user.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
