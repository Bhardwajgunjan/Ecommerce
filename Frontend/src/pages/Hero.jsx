// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Hero = () => {
//     const navigate = useNavigate();

//     return (

//         <div className='min-h-screen w-full bg-gray-100 flex items-center justify-center px-4'>

//             <div className='bg-white shadow-2xl rounded-3xl p-10 max-w-2xl w-full text-center'>

//                 <h1 className='text-5xl font-bold te    xt-gray-800 mb-6'>
//                     Welcome to E-commerce {name}
//                 </h1>

//                 <p className='text-gray-600 text-lg mb-8'>
//                     Search and choose your product.
//                     According to your ease and like.
//                 </p>

//                 <button
//                     onClick={() => navigate("/login")}
//                     className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 mr-2 rounded-xl text-lg font-semibold transition duration-300 cursor-pointer'
//                 >
//                     Login
//                 </button>

//                 <button
//                     onClick={() => navigate("/register")}
//                     className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition duration-300 cursor-pointer'
//                 >
//                     Register
//                 </button>



//             </div>

//         </div>
//     );
// };

// export default Hero;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center px-4 antialiased selection:bg-indigo-500 selection:text-white">
            
            <div className="max-w-4xl w-full flex flex-col items-center">
                
                {/* Main Welcome Card */}
                <div className="bg-white shadow-xl shadow-slate-200/60 rounded-3xl p-8 sm:p-12 w-full text-center border border-slate-100 mb-8">
                    
                    {/* Brand Badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 tracking-wide uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                        Storefront Engine v2.0
                    </span>

                    <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                        E-Commerce Admin Panel
                    </h1>

                    <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        "Find exactly what you’re looking for—and a few things you didn’t know you needed! Discover unique products tailored to your lifestyle with easy browsing and secure shopping."
                    </p>

                    {/* Operational Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate("/login")}
                            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-medium tracking-wide shadow-lg shadow-slate-900/10 transition active:scale-[0.98] cursor-pointer"
                        >
                            Sign In Here
                        </button>

                        <button
                            onClick={() => navigate("/register")}
                            className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-8 py-3.5 rounded-xl font-medium tracking-wide transition active:scale-[0.98] cursor-pointer"
                        >
                            Register Yourself
                        </button>
                    </div>

                </div>

                {/* Dynamic Quick Overview Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full px-2">
                    
                    {/* Card 1 */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                        <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28m0 0a12.017 12.017 0 0 1-2.035 3.523 11.944 11.944 0 0 1-7.155 3.429M3.75 5.49c0-.42.34-.76.76-.76h7.14c.42 0 .76.34.76.76v12.79c0 .42-.34.76-.76.76H4.51a.76.76 0 0 1-.76-.76V5.49Z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800 text-sm">Live Analytics</h3>
                            <p className="text-xs text-slate-400 mt-0.5">Monitor revenue trends and live user traffic.</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800 text-sm">Stock Control</h3>
                            <p className="text-xs text-slate-400 mt-0.5">Track variants, skus, and instant low-stock reports.</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                        <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800 text-sm">Order Fulfillment</h3>
                            <p className="text-xs text-slate-400 mt-0.5">Manage customer dispatch flows effortlessly.</p>
                        </div>
                    </div>

                </div>

            </div>
            
        </div>
    );
};

export default Hero;