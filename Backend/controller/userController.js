import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const getUsers =  async (req, res)=>{
    try{
        const users = await User.find();
        res.status(200).send(users);
    }
    catch(error){
        res.send(error)
    }
}

export const createUser = async (req,res)=>{
    const {name, age, email, password, phone,role } = req.body//vaidation
    
    try{
    if(!name || !age || !email || !password || !phone){
            return (
                res.status(401).send("all fields are req")
            )}
            
    if(!email.includes("@gmail.com")){//vaidation
        return res.status(400).send("Email will be corrected");
    }

    const existingUser = await User.findOne({email});
    console.log(existingUser);

    if(existingUser){
        return res.status(400).send("user alreay eist with tat emi");
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
        
        const user = new User({
            name,
            age,
            email,
            phone,
            password: hashedPassword,
            role
        })
        await user.save();
        console.log("User is creted");//to console on backend
        res.send("User is created for frontend");//to console on frontend
    }
    
    catch(error){
        console.log(error);
        res.send(error);
    }
}

export const getById = async (req, res)=>{
    const {id} = req.params;
    try{
        const users = await User.findById(id);
        res.status(200).send(users);
    }
    catch(error){
        res.send(error)
    }
}

export const getByPhone = async (req, res)=>{
    const {phone, email} = req.body;
    try{
        const users = await User.find({phone, email});
        res.status(200).send(users);
    }
    catch(error){
        res.send(error)
    }
}

export const deleteUser = async(req,res) =>{
    const {id} = req.params
    try{
        await User.findByIdAndDelete(id);
        console.log("User deleted")
        res.send("User deleted")
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

export const updateUser = async(req, res)=>{
    
    const {id}= req.params;
    const {name, age, email, password, role} = req.body;
    if(!id){//vaidation
        return res.status(401).send("Id not exist")
    }
    if(!name || !age){//vaidation
        return res.status(401).send("name and age required")
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {name, age}, {new: true})

        if(!updatedUser) {
            return res.status(404).send("user not exist");
        }
        res.status(200).send(updatedUser);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

export const loginUser = async (req,res) => {
    const {email, password} = req.body;
    // 123456
    console.log(email, password)
    // g@gmailcom , 123456
    if(!email || !password){
        return res.status(401).send("Email and password is required");
    }

    try{
        const user = await User.findOne({email});
        console.log(user);  
         if(!user){ 
            return res.status(401).send("User not found wih that email")
        }

        // user{a@gmail.com, passwor:dhgkdjhcngdhmdjkh xhgnsghiurdgh ridukfj}
        const isMatched = await bcrypt.compare(password, user.password)
        if(isMatched){
            const token = jwt.sign(

                {
                    id: user._id,
                    role: user.role
                },

                process.env.JWT_KEY,

                {
                    expiresIn: "1d"
                }

            );

            return res.status(200).json({

                message: "Login Successfully",

                token,

                user: {
                    id: user._id,
                    role: user.role
                }

            });

        } else {
            return res.status(401).json({
                message: "Invalid credentials"
            });

        }
    }
    catch (error) {

        console.log(error);

        return res.status(500).json({
            message: error.message
        });

    }
}



// 6a0844d304973ca6be63fe99
//crete login controller match emsil nd pass from db and res login succe if matced nd invaid credentials if not match