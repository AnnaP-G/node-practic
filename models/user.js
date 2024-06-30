import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarURL: {
    type: String,
    default:
      "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611768.jpg?w=826&t=st=1718538583~exp=1718539183~hmac=75f4f603a17beff996e58e0d505be5a0a0087c672c5b46d39b6b9003a7ebc88e",
  },
});

export const User = model("users", userSchema);
