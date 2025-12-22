import mongoose from "mongoose";
 
const {model, schema}=mongoose

const subTodoSchema = new schema ({
    conten:{
        type:string,
        required: true,
    },
    complete:{
        type:boolean,
        default:false
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

export const SubTodo = model('SubTodo',subTodoSchema)