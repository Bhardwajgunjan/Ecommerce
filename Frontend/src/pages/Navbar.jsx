// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div className="bg-black text-white p-4 flex justify-between">

//       <h1>E-Commerce</h1>

//       <div className="flex gap-5">

//         <Link to="/profile">
//           Your Profile
//         </Link>

//       </div>

//     </div>
//   );
// };

// export default Navbar;

import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {

  const user = JSON.parse(localStorage.getItem("user"));

  try {

    const response = await axios.get(
      `http://localhost:3000/cart/getcart/${user.id}`
    );

    const totalQuantity = response.data.reduce(
      (total, item) => total + item.quantity,
       0
    );

    setCartCount(totalQuantity);

  } catch(error) {

    console.log(error);

  }
};

 useEffect(() => {

    fetchCart();

  }, []);


  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* BRAND LOGO FLAG */}
          <Link to="/" className="flex items-center gap-2.5 group select-none">
            <div className="h-9 w-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-sm tracking-tighter group-hover:bg-indigo-600 transition-colors duration-300 shadow-sm">
              E
            </div>
            <span className="text-base font-black tracking-tight text-slate-900 group-hover:text-slate-800 transition-colors">
              E-Commerce<span className="text-indigo-600">.</span>
            </span>
          </Link>

          {/* NAVIGATION LINKS CONTAINER */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Catalog Link */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive("/")
                  ? "bg-slate-50 text-indigo-600"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/60"
              }`}
            >
              Shop Catalog
            </Link>

            {/* Admin Management Workspace shortcut */}
            <Link
              to="/admin"
              className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive("/admin")
                  ? "bg-slate-50 text-indigo-600"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/60"
              }`}
            >
              Admin Studio
            </Link>

            {/* Cart Navigation Link */}
            <Link
              to="/cart"
              className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive("/cart")
                  ? "bg-slate-50 text-indigo-600"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/60"
              }`}
            >
               Cart ({cartCount})
            </Link>

            {/* Decorative Break Line Divider */}
            <span
              className="h-4 w-px bg-slate-200 block mx-1"
              aria-hidden="true"
            />

            {/* USER PROFILE ACTION TRIGGER */}
            <Link
              to="/profile"
              className={`flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border transition-all duration-300 ${
                isActive("/profile")
                  ? "bg-indigo-50/50 border-indigo-100/80 text-indigo-700 shadow-sm shadow-indigo-100/10"
                  : "bg-white border-slate-200/60 text-slate-600 hover:border-slate-300 hover:text-slate-900 hover:shadow-sm"
              }`}
            >
              {/* Dynamic Interactive Avatar Ring placeholder */}
              <div
                className={`h-6 w-6 rounded-lg text-[10px] font-black flex items-center justify-center transition-colors shadow-inner ${
                  isActive("/profile")
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {userInitial}
              </div>

              <span className="text-xs font-bold tracking-wide hidden sm:inline">
                Account Profile
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
