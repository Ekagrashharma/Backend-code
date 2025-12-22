import mongoose from "mongoose";
const { model, schema } = mongoose;

const todoschema = new schema({
  content: {
    type: string,
    require: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  subTodo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

export const Todo = model("Todo", todoschema);
