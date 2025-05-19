import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

export const register=async(req,res)=>{
  try{
    console.log("Register route trigger");
    const{name,email,password}=req.body; 
    if(!name || !email || !password){
      return res.json({success:false,message:"Missing Details"})
    }

    const existingUser=await User.findOne({email})
    if(existingUser)
    {
      return res.json({success:false,message:"User already exists"})
    }

    const hashedpassword=await bcrypt.hash(password,10)

    const user=await User.create({name,email,password:hashedpassword})

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

    res.cookie('token',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite:process.env.NODE_ENV==='production'?'none':'strict',

      maxAge:7*24*60*60*1000,

    })

    return res.json({success:true,user:{email:user.email,name:user.name}})
  }
  catch(error){
    console.log(error.message)
    return res.json({success:false,message:error.message});
  }
}

export const login=async(req,res)=>{
  try{
    const{email,password}=req.body;

    if(!email || !password)
    {
      return res.json({success:false,message:"Email and password are required"});
    }
    const user=await User.findOne({email});
    if(!user){
      return res.json({success:false,message:"INvalid email or password"});
    }

    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
      return res.json({success:false,message:"Invalid email or password"});
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

    res.cookie('token',token,{
      httpOnly:true,// prevent Javascript to access cookie
      secure:process.env.NODE_ENV==='production',

      sameSite:process.env.NODE_ENV==='production'?'none':'strict', 

      maxAge:7*24*60*60*1000

    })
    return res.json({success:true,user:{email:user.email,name:user.name}})




  }
  catch(error)
  {
    console.log(error.message)
    return res.json({success:false,message:error.message});
  }

}


export const isAuth=async(req,res)=>{
  try {
    const userId=req.userId; 

    if(!userId){
      return res.status(401).json({success:false,message:"Not authorized"});
    }

    const user=await User.findById(userId).select("-password");

    if(!user){
      return res.status(404).json({success:false,message:"User not found"});
    }

    return res.json({success:true,user});
    
  } catch (error) {
    console.log("isAuth error:",error.message);
    return res.status(500).json({success:false,message:error,message});
  }
}

export const logout=async(req,res)=>{
  try {

    res.clearCookie('token',{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite:process.env.NODE_ENV==='production'?'none':'strict',

    })

    return res.json({success:true,message:"Logged Out"})
    
  } catch (error) {
    console.log(error.message)
    return res.json({success:false,message:error.message});
    
  }
}