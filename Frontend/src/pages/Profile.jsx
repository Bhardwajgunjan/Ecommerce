// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

// const Profile = () => {
    
//     const [profile, setProfile] = useState ({});

//     const user = JSON.parse(localStorage.getItem("user"));

//     const id = user?.id;

//     const fetchProfile = async (e) => {
        
//         try
//         {
//             const response = await axios.get(`http://localhost:3000/user/profile/${id}`)
//             setProfile(response?.data);
//         }
//         catch(error)
//         {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//      fetchProfile();
//     }, []);
    
//     const updateProfile = async (e) =>{

//      try
//      {
//         const response = await axios.put(`http://localhost:3000/user/updateProfile/${id}`, profile)
//      }

//      catch(error)
//      {
//         console.log(error)
//      }     
//     }

//   return (
//     <>
//     <div>Profile details</div>

//         <h2>Name: {profile?.name}</h2>

//         <h2>Age: {profile?.age}</h2>

//         <h2>Email: {profile?.email}</h2>

//         <h2>Phone: {profile?.phone}</h2>

//         <h2>Role: {profile?.role}</h2>
//     </>
//   )
// }

// export default Profile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: '',
        age: '',
        email: '',
        phone: '',
        role: ''
    });
    
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState({ type: '', message: '' });

    // Safely parse user payload from local metadata storage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const id = user?.id;

    const fetchProfile = async () => {
        if (!id) {
            setStatus({ type: 'error', message: 'No authenticated active user token found. Please sign in.' });
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:3000/user/profile/${id}`);
            setProfile(response?.data || {});
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: 'Failed to synchronize workspace profile assets.' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const updateProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await axios.put(`http://localhost:3000/user/updateProfile/${id}`, profile);
            setStatus({ type: 'success', message: 'Profile security changes saved successfully!' });
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: error?.response?.data?.message || 'Failed to sync modifications.' });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && !isEditing) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <svg className="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <p className="text-xs font-medium text-slate-400 tracking-wider uppercase">Loading console assets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-slate-50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white px-4 py-12 md:py-20 flex justify-center items-start">
            
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                
                {/* Decorative Banner Block with Initials Avatar */}
                <div className="h-32 bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 relative flex items-end px-6 sm:px-8">
                    <div className="w-20 h-20 bg-white border-4 border-white rounded-2xl shadow-md translate-y-8 flex items-center justify-center text-2xl font-black text-indigo-600 select-none">
                        {profile?.name ? profile.name.charAt(0).toUpperCase() : 'A'}
                    </div>
                </div>

                {/* Main Profile Info Section */}
                <div className="pt-12 p-6 sm:p-8">
                    
                    {/* Header line containing Identity and Badges */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight">{profile?.name || 'Identity Unknown'}</h1>
                            <p className="text-xs text-slate-400 mt-0.5">System Identifier Index Key: <span className="font-mono text-slate-500">{id || 'Null'}</span></p>
                        </div>
                        
                        {/* Dynamic Security Verification Tag Badge */}
                        <span className={`inline-flex items-center self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            profile?.role?.toLowerCase() === 'admin' 
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' 
                                : 'bg-slate-100 text-slate-600'
                        }`}>
                            {profile?.role || 'Staff Operator'}
                        </span>
                    </div>

                    {/* Operational Feedback Strip */}
                    {status.message && (
                        <div className={`mb-6 p-4 rounded-xl text-sm border flex items-start gap-2.5 ${
                            status.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'
                        }`}>
                            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d={status.type === 'success' ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0Zm-9 3.75h.008v.008H12v-.008Z"} />
                            </svg>
                            <span className="font-medium">{status.message}</span>
                        </div>
                    )}

                    <form onSubmit={updateProfile}>
                        {/* 2x2 Field Properties Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            
                            {/* Input Field: Name */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full User Account Head</label>
                                <input
                                    type="text" required disabled={!isEditing || isLoading} value={profile.name || ''}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className={`w-full text-sm font-medium rounded-xl px-4 py-2.5 transition border outline-none ${
                                        isEditing 
                                            ? 'bg-slate-50 border-slate-200 focus:border-indigo-600 focus:bg-white text-slate-800' 
                                            : 'bg-transparent border-transparent text-slate-900 font-semibold px-0 py-0 pointer-events-none'
                                    }`}
                                />
                            </div>

                            {/* Input Field: Email */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Corporate Email</label>
                                <input
                                    type="email" required disabled={!isEditing || isLoading} value={profile.email || ''}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className={`w-full text-sm font-medium rounded-xl px-4 py-2.5 transition border outline-none ${
                                        isEditing 
                                            ? 'bg-slate-50 border-slate-200 focus:border-indigo-600 focus:bg-white text-slate-800' 
                                            : 'bg-transparent border-transparent text-slate-900 font-semibold px-0 py-0 pointer-events-none'
                                    }`}
                                />
                            </div>

                            {/* Input Field: Contact Phone */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Secure Phone Association</label>
                                <input
                                    type="tel" required disabled={!isEditing || isLoading} value={profile.phone || ''}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    className={`w-full text-sm font-medium rounded-xl px-4 py-2.5 transition border outline-none ${
                                        isEditing 
                                            ? 'bg-slate-50 border-slate-200 focus:border-indigo-600 focus:bg-white text-slate-800' 
                                            : 'bg-transparent border-transparent text-slate-900 font-semibold px-0 py-0 pointer-events-none'
                                    }`}
                                />
                            </div>

                            {/* Input Field: Age */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Age Parameter Matrix</label>
                                <input
                                    type="number" required disabled={!isEditing || isLoading} value={profile.age || ''}
                                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                                    className={`w-full text-sm font-medium rounded-xl px-4 py-2.5 transition border outline-none ${
                                        isEditing 
                                            ? 'bg-slate-50 border-slate-200 focus:border-indigo-600 focus:bg-white text-slate-800' 
                                            : 'bg-transparent border-transparent text-slate-900 font-semibold px-0 py-0 pointer-events-none'
                                    }`}
                                />
                            </div>

                        </div>

                        {/* Interactive Mode Control Bar Actions Footer */}
                        <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
                            {isEditing ? (
                                <>
                                    <button
                                        type="button" disabled={isLoading}
                                        onClick={() => { setIsEditing(false); fetchProfile(); }}
                                        className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                                    >
                                        Cancel Changes
                                    </button>
                                    <button
                                        type="submit" disabled={isLoading}
                                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-md shadow-indigo-600/10 transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                                    >
                                        {isLoading ? "Saving Parameters..." : "Commit Settings"}
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button" disabled={!id}
                                    onClick={() => { setIsEditing(true); setStatus({ type: '', message: '' }); }}
                                    className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs tracking-wide px-6 py-3 rounded-xl shadow-md transition active:scale-[0.98] disabled:opacity-40 cursor-pointer"
                                >
                                    Modify Console Profile Info
                                </button>
                            )}
                        </div>
                    </form>

                </div>
            </div>

        </div>
    );
};

export default Profile;