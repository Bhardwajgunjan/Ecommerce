import axios from "axios";
import { useEffect } from "react";
import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({children}) =>{
    const [cartCount, setCartCount] = useState(0);

    const user = JSON.parse(localStorage.getItem("user") || "{}")

    const fetchCart = async() => {
        try{
            const response =await axios.get(`http://localhost:3000/cart/getcart/${user.id}`);
            const total = response.data.reduce((sum,item)  => sum + item.quantity, 0 ) 
            setCartCount(total);
        }
        catch(error){
            console.log(error.response?.data || error.message)
        }
    } 
    useEffect(() => {
    fetchCart();   
    }, []);
    
    return(
        <CartContext.Provider value= {{cartCount, fetchCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

