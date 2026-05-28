import express from 'express'
import User from '../models/User.js'
import mongoose from "mongoose";    

export const getProfile = async (req, res) => {
    const {id} = req.params;
    
    try{

        const user = await User.findById(id).select("-password");

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        res.status(200).json(user)
    }
    catch(error)
    {
      res.status(500).json({message: error.message});
    }
}

export const updateProfile = async (req, res) => {

    try{        
        
        const {name, age, email, phone, role} = req.body;

        const updateUser = await User.findByIdAndUpdate(req.params.id,{name,age,email,phone},{new: true}).select("-password");

        if(!updateUser){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json({message: "Profile updated successfully",updateUser});
    }
    catch(error)
    {
      res.status(500).json({message: error.message});
    }
}
