import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: Number,
    email: {type: String, required: true, unique: true},    
    password: String,
    phone:String,
     role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

}, { timestamps: true });

export default mongoose.model("User",userSchema) ;
