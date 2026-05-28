// import React from 'react'
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'

// const Register = () => {
//     const navigate = useNavigate();
//     const [name, setName] = useState('');
//     const [age, setAge] = useState('');
//     const [phone, setPhone] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [user, setUser] = useState(null);

//     const handleRegister = async (e) =>{ 
//         e.preventDefault();
//         console.log(name,age,phone,email,password);

//         try{
//             const response = await axios.post(
//                 "http://localhost:3000/user/createUser",
//                 {
//                     name,
//                     age,
//                     phone,
//                     email,
//                     password
//                 })
//                 console.log(response.data)
//                 alert(response.data);
//                 navigate('/dashboard')
//         }
//         catch(error){
//             console.error(error?.response?.data);
//             alert(error?.response?.data
//             )
//         }
//     }

//     return (

//         <div className='min-h-screen w-full bg-gray-100 flex items-center justify-center px-4'>

//             <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>

//                 <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>
//                     Register
//                 </h1>

//                 <form
//                     onSubmit={handleRegister}
//                     className='flex flex-col gap-5'
//                 >
//                     <div className='flex flex-col gap-2'>

//                         <label className='text-gray-700 font-medium'>
//                             Name
//                         </label>

//                         <input
//                             type='text'
//                             placeholder='Enter your name'
//                             value={name}
//                             onChange={(e) =>
//                                 setName(e.target.value)
//                             }
//                             className='border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500'
//                         />

//                     </div>

//                     <div className='flex flex-col gap-2'>

//                         <label className='text-gray-700 font-medium'>
//                             Age
//                         </label>

//                         <input
//                             type='number'
//                             placeholder='Enter your Age'
//                             value={age}
//                             onChange={(e) =>
//                                 setAge(e.target.value)
//                             }
//                             className='border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500'
//                         />

//                     </div>

//                     <div className='flex flex-col gap-2'>

//                         <label className='text-gray-700 font-medium'>
//                             Phone Number
//                         </label>

//                         <input
//                             type='number'
//                             placeholder='Enter your name'
//                             value={phone}
//                             onChange={(e) =>
//                                 setPhone(e.target.value)
//                             }
//                             className='border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500'
//                         />

//                     </div>

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
//                         Register
//                     </button>

//                 </form>

//             </div>

//         </div>
//     );
// }

// export default Register


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(false);

        try {
            const response = await axios.post(
                "http://localhost:3000/user/createUser",
                { name, age, phone, email, password }
            );
            
            console.log(response.data);
            navigate('/dashboard');
        } catch (error) {
            console.error(error?.response?.data);
            setError(error?.response?.data?.message || error?.response?.data || 'Failed to construct account.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center px-4 py-12 antialiased selection:bg-indigo-500 selection:text-white">
            
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10">
                
                {/* Header Block */}
                <div className="flex flex-col items-center mb-8 text-center">
                    <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200 mb-4">
                        E
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Create Your Account
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Register your credentials to access the platform
                    </p>
                </div>

                {/* Error Notifications Container */}
                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl text-sm text-rose-600 flex items-start gap-2 animate-fade-in">
                        <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    
                    {/* Full Name Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            disabled={isLoading}
                            placeholder="Alex Mercer"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-600 focus:bg-white disabled:opacity-60"
                        />
                    </div>

                    {/* 2-Column Row for Age & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        
                        {/* Age Input */}
                        <div className="flex flex-col gap-1.5 sm:col-span-1">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                Age
                            </label>
                            <input
                                type="number"
                                required
                                disabled={isLoading}
                                placeholder="24"
                                min="18"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-600 focus:bg-white disabled:opacity-60"
                            />
                        </div>

                        {/* Phone input */}
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                Contact Number
                            </label>
                            <input
                                type="tel"
                                required
                                disabled={isLoading}
                                placeholder="+1 (555) 000-0000"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-600 focus:bg-white disabled:opacity-60"
                            />
                        </div>

                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            disabled={isLoading}
                            placeholder="alex@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-600 focus:bg-white disabled:opacity-60"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            disabled={isLoading}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-600 focus:bg-white disabled:opacity-60"
                        />
                    </div>
    
    
                    {/* Submit Registration */}
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
                                Creating System Profile...
                            </>
                        ) : (
                            'Register Admin Account'
                        )}
                    </button>

                </form>

                {/* Back to Login link alternative */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-500">
                        Already have an account?{' '}
                        <button 
                            onClick={() => navigate('/login')} 
                            className="text-indigo-600 hover:text-indigo-700 font-medium transition underline underline-offset-4 cursor-pointer"
                        >
                            Sign In
                        </button>
                    </p>
                </div>

            </div>

        </div>
    );
};

export default Register;