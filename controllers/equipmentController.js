import {v2 as cloudinary} from "cloudinary"
import Equipment from "../models/equipment.js"


export const addEquipment = async (req, res) => {
  try {
    let equipmentData = JSON.parse(req.body.productData); // ✅ corrected key
    const images = req.files;

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );

    await Equipment.create({ ...equipmentData, image: imageUrl });

    res.json({ success: true, message: "Equipment Added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export const equipmentList=async(req,res)=>{
  try {
    const equipments=await Equipment.find({})
    res.json({success:true,equipments})
  } catch (error) {
    console.log(error.message)
    res.json({success:false,message:error.message})
    
  }
}