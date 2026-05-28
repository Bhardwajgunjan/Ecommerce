// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const UserProducts = () => {
//   const [products, setProducts] = useState([]);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/product/getProducts",
//       );
//       setProducts(response?.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-4xl font-bold text-center mb-10">All Products</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products?.map((product) => (
//           <div
//             key={product._id}
//             className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
//           >
//             {/* Product Image */}
//             {product.image && (
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="w-full h-52 object-cover"
//               />
//             )}

//             {/* Product Details */}
//             <div className="p-4">
//               <h2 className="text-xl font-semibold mb-2">{product.title}</h2>

//               <p className="text-gray-600 text-sm mb-3">
//                 {product.description}
//               </p>

//               <div className="flex justify-between items-center mb-3">
//                 <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
//                   {product.category}
//                 </span>

//                 <span className="text-lg font-bold text-green-600">
//                   ₹{product.price}
//                 </span>
//               </div>

//               <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserProducts;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

<>
  <Navbar />

  <div>User Products Content</div>
</>;

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:3000/product/getProducts",
      );
      // Fallback array check to handle empty responses smoothly
      setProducts(Array.isArray(response?.data) ? response.data : []);
    } catch (err) {
      console.error(err);
      setError("Unable to load products. Please try refresh your page.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    
    const user = JSON.parse(localStorage.getItem("user"));

    try {

      await axios.post("http://localhost:3000/cart/add", {
        userId: user._id,
        productId,
        quantity: 1,
      });
      console.log(user._id,
        productId,
        1)

      alert("Product added successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white px-4 py-12 md:px-8">
      {/* Decorative Store Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-2 block">
          Discover New Arrivals
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Our Handpicked Collection
        </h1>
        <div className="w-12 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Error State Banner */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-700 p-4 rounded-xl max-w-md mx-auto text-center font-medium text-sm">
            {error}
          </div>
        )}

        {/* LOADING SKELETON PLACEHOLDERS */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-95 border border-slate-200/50 p-4 flex flex-col gap-3"
              >
                <div className="w-full h-48 bg-slate-200 rounded-xl" />
                <div className="h-5 bg-slate-200 rounded-md w-3/4 mt-2" />
                <div className="h-4 bg-slate-200 rounded-md w-full" />
                <div className="h-4 bg-slate-200 rounded-md w-1/2" />
                <div className="h-10 bg-slate-200 rounded-xl w-full mt-auto" />
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE CONDITION */}
        {!isLoading && products.length === 0 && !error && (
          <div className="text-center py-20 bg-white rounded-3xl border max-w-md mx-auto p-8">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-800">
              No products available
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Check back later! Fresh inventory drops are on their way.
            </p>
          </div>
        )}

        {/* PRODUCT INVENTORY POPULATED GRID */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const isAvailable = product.stock !== false; // Explicit false validation
              return (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:shadow-xl hover:border-slate-300/80 transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Aspect Ratio Cropped Image Wrapper Container */}
                  <div className="h-56 w-full bg-slate-100 overflow-hidden relative border-b border-slate-100 flex items-center justify-center">
                    <img
                      src={
                        product.image ||
                        "https://placehold.co/600x400/f1f5f9/94a3b8?text=No+Image+Available"
                      }
                      alt={product.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/600x400/f1f5f9/94a3b8?text=Image+Not+Found";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Floating Out of Stock Badge Overlay */}
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="bg-slate-900/90 text-white font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-md shadow-md">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Information Details Container */}
                  <div className="p-5 flex flex-col grow">
                    {/* Category Label */}
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1 block">
                      {product.category || "General"}
                    </span>

                    {/* Product Name Title */}
                    <h2 className="text-base font-bold text-slate-900 tracking-tight line-clamp-1 mb-1.5 group-hover:text-indigo-600 transition-colors">
                      {product.title}
                    </h2>

                    {/* Truncated Description */}
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4 grow">
                      {product.description ||
                        "No description provided by seller details profile."}
                    </p>

                    {/* Pricing Framework Action Block */}
                    <div className="pt-4 border-t border-slate-100 mt-auto flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                          Price
                        </span>
                        <span className="text-lg font-black text-slate-900 tracking-tight">
                          ₹{Number(product.price || 0).toLocaleString("en-IN")}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(product._id)}
                        disabled={!isAvailable}
                        className={`px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide transition duration-200 shrink-0 ${
                          isAvailable
                            ? "bg-slate-900 hover:bg-indigo-600 text-white shadow-md active:scale-[0.97] cursor-pointer"
                            : "bg-slate-100 text-slate-400 pointer-events-none"
                        }`}
                      >
                        {isAvailable ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProducts;
