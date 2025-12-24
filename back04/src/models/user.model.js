import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: string,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: string,
      require: true,
      unique: true,
      trim: true,
    },
    fullname: {
      type: string,
      require: true,
      trim: true,
    },
    avatar: {
      type: string, // cloudnary url
      required: true,
    },
    coverImage: {
      type: string, // cloudnary url
    },
    watchHistory: [
      {
        type: Schema.model.Types.ObjectId,
        ref: "video",
      },
    ],
    password: {
      type: string,
      require: true,
    },
    refreshTokens: {
      type: string,
    },
  },{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);