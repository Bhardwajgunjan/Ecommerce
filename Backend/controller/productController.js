import express from 'express'
import Product from '../models/Product.js'
import mongoose from 'mongoose'

export const createProduct = async (req, res) =>{
    const {title,description,price, stock,category, image,} = req.body;

    try{
        if(!title || !price){
            return res.send(500).send("Title and price are required")
        } 
        const product = await Product.create({
            title,
            description,
            price, 
            stock,
            category, 
            image,
        })
        res.status(201).json({message:"Product created successfully", product})
    }

    catch(error){
        res.send(500).send.error
    }
}

export const getProducts =  async (req, res)=>{
    try{
        const product = await Product.find();
        res.status(200).send(product);
    }
    catch(error){
        res.send(error)
    }
}

export const getProduct = async(req,res) =>{
    const{id} = req.params;

    try{
        const product = await Product.findById(id)
            res.status(200).json({message:"Product details", product})
        }
        catch(error){
        res.send(500).send.error
    }
}

export const getByPhone = async (req, res)=>{
    const {phone, email} = req.body;
    try{
        const product = await Product.findOne({phone, email});
        res.status(200).json({message:"Product details", product});
    }
    catch(error){
        res.send(error)
    }
}


export const updateProduct = async (req,res) =>{
    const {id} = req.params;
//const {title,description,price, stock,category, image} = req.body;

    try{
        const product = await Product.findByIdAndUpdate(id,req.body,{new: true})

        if(!product){
            return res.send(500).send("Product not found")
        }
        res.status(200).json({message: "Product updated successfully",product})
    }
        catch(error){
        res.send(500).error
    }
}

export const deleteProduct = async (req,res) =>{
    const {id} = req.params

    try{

    const product = await Product.findByIdAndDelete(id);

     if(!product){
        return res.send("Product not found")
    }
    res.status(200).json({message: "Product deleted successfully",deleteProduct})

    }
    catch(error){
        res.status(500).error
    }
}

//6a10a9b5b438bd3e25439da5
//6a10ab266d94ae17e22389d5

// {
//         "_id": "6a10a9b5b438bd3e25439da5",
//         "title": "Bottle",
//         "description": "This is a bottle in plastic ",
//         "price": 125,
//         "category": "Plastic",
//         "image": "https://badami.com.bd/public/uploads/all/Awyhkwk2cpOLkoVkKCl8fsQ5XM8Jd63szYGUMrhq.webp",
//         "createdAt": "2026-05-22T19:08:37.962Z",
//         "__v": 0
//     },