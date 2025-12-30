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
    fullName: {
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

    this.password= await bcrypt.hash(this.password,10);
    next()
});

  userSchema.methods.isPasswordCorrect = async function(password) {
      return await (bcrypt.compare(password, this.password))
  }
    
  userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
      {
        _id : this.id,
        username:this.username,
        email: this.email,
        fullName : this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
    )
  }
  userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
      {
        _id : this.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
    )
  }

export const User = mongoose.model("User", userSchema);