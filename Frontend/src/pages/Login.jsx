// import React from 'react'
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'

// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [user, setUser] = useState(null);

//     const handleLogin = async (e) => {

//         e.preventDefault();//to prevent page reloading

//         try {
//             const response = await axios.post(
//                 "http://localhost:3000/user/login",
//                 {
//                     email,
//                     password
//                 }
//             );

//             alert(response.data.message);
//             console.log(response);
            
//             setUser(response.data.user);
//             navigate('/dashboard')

//         } catch (err) {
//             console.error(err?.response?.data);
//             alert(err?.response?.data);
//         }
//     };

//     return (

//         <div className='min-h-screen w-full bg-gray-100 flex items-center justify-center px-4'>

//             <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>

//                 <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>
//                     Login
//                 </h1>

//                 <form
//                     onSubmit={handleLogin}
//                     className='flex flex-col gap-5'
//                 >

//                     <div className='flex flex-col gap-2'>

//                         <label className='text-gray-700 font-medium'>
//                             Email
//                         </label>

//                         <input
//                             type='email'
//                             placeholder='Enter your email'
//                             value={email}
//                             onChange={(e) =>
//                                 setEmail(e.target.value)
//                             }
//                             className='border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500'
//                         />

//                     </div>

//                     <div className='flex flex-col gap-2'>

//                         <label className='text-gray-700 font-medium'>
//                             Password
//                         </label>

//                         <input
//                             type='password'
//                             placeholder='Enter your password'
//                             value={password}
//                             onChange={(e) =>
//                                 setPassword(e.target.value)
//                             }
//                             className='border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500'
//                         />

//                     </div>

//                     <button
//                         type='submit'
//                         className='bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300 cursor-pointer'
//                     >
//                         Login
//                     </button>

//                 </form>


//                 {
//                     user && (
//                         <div className='mt-8 bg-gray-50 rounded-xl p-5 border'>

//                             <h2 className='text-xl font-bold mb-3 text-gray-800'>
//                                 User Details
//                             </h2>

//                             <p className='text-gray-700'>
//                                 <span className='font-semibold'>
//                                     Name:
//                                 </span>{" "}
//                                 {user.name}
//                             </p>

//                             <p className='text-gray-700'>
//                                 <span className='font-semibold'>
//                                     Email:
//                                 </span>{" "}
//                                 {user.email}
//                             </p>

//                         </div>
//                     )
//                 }

//             </div>

//         </div>
//     );
// }

// export default Login




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post(//login api
                "http://localhost:3000/user/login",
                { email, password }
            );

            // Storing token or user profile in localStorage is standard for admin dashboards
            console.log(response?.data?.user);
            localStorage.setItem('user', JSON.stringify(response?.data?.user));
            if (response.data?.user?.role=='admin') {
                navigate('/admin-dashboard');
            }
            // Redirect straight to dashboard on success
            else{
                navigate('/products');
            }
        } catch (err) {
            console.error(err?.response?.data);
            // Fallback to a readable error message
            setError(err?.response?.data?.message || err?.response?.data || 'Invalid email or password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center px-4 antialiased selection:bg-indigo-500 selection:text-white">
            
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10">
                
                {/* Brand Logo & Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200 mb-4">
                        E
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Login Control Panel
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Sign in to manage and look your storefront
                    </p>
                </div>

                {/* Inline Error Alert */}
                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl text-sm text-rose-600 flex items-start gap-2 animate-fade-in">
                        <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    
                    {/* Email Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                placeholder="admin@store.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-600 focus:bg-white disabled:opacity-60"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                Password
                            </label>
                            <a href="#forgot" className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition">
                                Forgot password?
                            </a>
                        </div>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-600 focus:bg-white disabled:opacity-60"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-medium tracking-wide transition duration-200 shadow-lg shadow-slate-900/10 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 mt-2 cursor-pointer"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Authenticating...
                            </>
                        ) : (
                            'Sign In to Dashboard'
                        )}
                    </button>

                </form>

            </div>
            
            {/* Footer Notice */}
            <p className="text-xs text-slate-400 mt-6 text-center max-w-xs leading-relaxed">
                Secured operator channel. Authorized personnel access only.
            </p>
            
        </div>
    );
};

export default Login;