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

userSchema.pre("save", async function (next) {  
    if(!this.isModified("password")) return next()  

    this.password= bcrypt.hash(this.password,10);
    next()
});

  userSchema.methods.isPasswordCorrect = async function(password) {
      return await (bcrypt.compare(password, this.password))
  }

export const User = mongoose.model("User", userSchema);