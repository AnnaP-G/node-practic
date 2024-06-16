import { Schema, model } from "mongoose";

const sessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  accessToken: {
    type: String,
    required: true,
  },
  accessTokenValidUntil: {
    type: Date,
    required: true,
  },
});

export const Session = model("sessions", sessionSchema);
