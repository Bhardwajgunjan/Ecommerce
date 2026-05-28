// import React from 'react'
// import axios from 'axios'

// const ProductCard = ({ product }) => {

//     const addTocart = async () => {
//        const user = JSON.parse(localStorage.getItem("user"));
//        try{
//         await axios.post("http://localhost:3000/cart/add", {userId: user._id, productId: product._id, quantity: 1});
//         alert("Product added successfully")
//        }
//        catch(error){
//         console.log(error)
//        }
//     }

//     return (
//         <div className='border p-4 rounded w-64 shadow'>

//             <img
//                 src={product.image}
//                 alt={product.name}
//                 className='h-40 w-full object-cover'
//             />

//             <h2 className='text-xl font-bold mt-2'>
//                 {product.name}
//             </h2>

//             <p>₹ {product.price}</p>

//             <button
//                 onClick={addToCart}
//                 className='bg-blue-500 text-white px-4 py-2 rounded mt-3'
//             >
//                 Add To Cart
//             </button>

//         </div>
//     )
// }

// export default ProductCard
