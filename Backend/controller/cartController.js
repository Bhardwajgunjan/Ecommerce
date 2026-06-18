import express from 'express'
import Cart from '../models/Cart.js'


export const addToCart = async (req, res) => {

    try {
        console.log(req.body);
        const { userId, productId, quantity } = req.body;

        // Check if product already exists
        const existing = await Cart.findOne({
            userId,
            productId
        });

        if (existing) {

            existing.quantity += quantity;

            await existing.save();

            return res.status(200).json({
                message: "Cart updated",
                existing
            });
        }

        // Create new cart item
        const cart = await Cart.create({
            userId,
            productId,
            quantity
        });

        res.status(201).json({
            message: "Product added to cart",
            cart
        });

    } catch(error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
}

export const getCartItems = async (req, res) => {

    try{
        const {userId} = req.params
        const cartItems = await Cart.find({ userId }).populate("productId");

        return res.status(200).json(cartItems);
    }

    catch(error)
    {
        res.status(500).json({ message: "Server error"});
    }
}

export const deleteItem = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Item deleted" });
    } 
    
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}