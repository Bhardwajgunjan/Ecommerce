import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderPopup from "./OrderPopup";
import { useCart } from "./CartContext";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { fetchCart } = useCart();

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/cart/getcart/${user.id}`,);
      setCartItems(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3000/cart/delete/${itemId}`);
      fetchCart();
      fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>

      {cartItems.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-xl shadow mb-5 flex gap-5 items-center"
            >
              <img
                src={item.productId.image}
                alt=""
                className="w-28 h-28 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="text-xl font-bold">{item.productId?.title}</h2>

                <p className="text-gray-600">₹ {item.productId?.price}</p>

                <p>Quantity: {item.quantity}</p>
              </div>

              <button
                 onClick={() => deleteItem(item._id)}
                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                Delete
              </button>

            </div>
          ))}

          <div className="bg-white p-5 rounded-xl shadow mt-8">
            <h2 className="text-2xl font-bold">Total: ₹ {totalPrice}</h2>

            <button
              onClick={() => setOrderPlaced(true)}
              className="mt-5 bg-black text-white px-6 py-3 rounded-lg"
            >
              Proceed To Buy
            </button>
          </div>
        </>
      )}
      {orderPlaced && <OrderPopup onClose={() => setOrderPlaced(false)} />}
    </div>
  );
};

export default Cart;
