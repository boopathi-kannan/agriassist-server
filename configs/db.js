import mongoose from "mongoose";

const connectDB=async()=>{
  try{
    console.log("MongoDB URL:",process.env.MONGODB_URL);
    mongoose.connection.on('connected',()=>console.log("Database Connected"));
    await mongoose.connect(process.env.MONGODB_URL.trim());
  }
  catch(error)
  {
    console.log(error.message)
  }
}

export default connectDB