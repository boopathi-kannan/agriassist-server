import mongoose, { mongo } from "mongoose";

const equipmentShcema=new mongoose.Schema({
  name:{type:String,required:true},
  description:{type:[String],required:true},
  rentPrice:{type:Number,required:true},
  image:{type:Array,required:true}
},{timestamps:true})

const Equipment=mongoose.models.equipment||mongoose.model('equipment',equipmentShcema)

export default Equipment