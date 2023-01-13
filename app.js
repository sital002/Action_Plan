import express from 'express';
import userRoute from './routes/userRoutes.js';


const app = express();

app.use(express.json())


app.use(userRoute);



app.use((err,req,res,next)=>{
    res.status(400).json({
        msg:err.message
    })
})

export default app;