import express from 'express'
import cors from 'cors'
import connectDB from './configs/db.js';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js';
import equipmentRouter from './routes/equipmentRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/OrderRote.js';
import { stripeWebhooks } from './controllers/orderController.js';
import connectCloudinary from './configs/cloudinary.js';
import chatbotRouter from './routes/chatbotRoute.js'


const app=express()
const port=process.env.PORT||4000; 
dotenv.config();
 
await connectDB()
await connectCloudinary()

const allowedOrigins=['https://agriassist-five.vercel.app/']

app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks)


app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}));



app.get('/',(req,res)=>res.send("Api is Working"));

app.use('/api/user',userRouter)

app.use('/api/seller',sellerRouter)

app.use('/api/product',productRouter)

app.use('/api/equipment',equipmentRouter)

app.use('/api/cart',cartRouter)

app.use('/api/address',addressRouter)

app.use('/api/order',orderRouter)
app.use('/api/chatbot', chatbotRouter)


app.listen(port,()=>{
  console.log(`Server is running on http://localhost:${port}`)
})
