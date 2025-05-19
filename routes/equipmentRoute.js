import express from 'express'
import authSeller from '../middleware/authSeller.js'
import { addEquipment, equipmentList } from '../controllers/equipmentController.js'
import { upload } from '../configs/multer.js'

const equipmentRouter=express.Router()

equipmentRouter.post('/add',upload.array("images"),authSeller,addEquipment)

equipmentRouter.get('/list',equipmentList)

export default equipmentRouter