import { Schema, model } from "mongoose";

const sessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  accessToken: { // w2BX1jwnpD7wi2bvrCgKkhPBR9XPYlgfMuI4HiJT
    type: String,
    required: true,
  },
  accessTokenValidUntil: {
    type: Date,
    required: true,
  },
});

export const Session = model("sessions", sessionSchema);
