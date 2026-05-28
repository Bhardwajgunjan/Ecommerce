import express from 'express';
import mongoose from'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import cors from 'cors'

app.use(express.json());//middleware

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

app.use(cors({
        origin: "http://localhost:5173"
    }));

app.get("/", (req,res) => {
    res.send("Server is Running");
});

app.use('/user', userRoutes)//public route
app.use('/product', productRoutes)
app.use('/cart', cartRoutes)

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


