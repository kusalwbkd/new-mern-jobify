
import 'express-async-errors'
import * as dotev from 'dotenv'
dotev.config()
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary';
//routes

import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'


//public

import path, {dirname} from 'path'
import { fileURLToPath } from 'url'


//middlewares
import errorAHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

const __dirname = dirname(fileURLToPath(import.meta.url));


const app=express()

if(process.env.NODE_ENV=== 'development'){
    app.use(morgan('dev'))
}

app.use(express.static(path.resolve(__dirname, './client/dist')));
app.use(cookieParser())
app.use(express.json())

//some chnages done

app.get('/',(req,res)=>{
    res.send('hello world')
})
app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' });
  });
app.post('/',(req,res)=>{
console.log(req);
res.send({msg:'data receivded',data:req.body})
})

app.use('/api/v1/jobs', authenticateUser,jobRouter)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',authenticateUser,userRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
  });

app.use('*',(req,res)=>{
res.status(404).json({msg:'route not found!!!!'})
})

app.use(errorAHandlerMiddleware)

const port=process.env.PORT||5100

try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port,()=>{
        console.log(`the server running on port ${port}....`);
    })
} catch (error) {
    console.log(error);
    process.exit(1)
}



