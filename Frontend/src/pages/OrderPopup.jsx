import React from 'react';

const OrderPopup = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
         
         
            <div className="bg-white px-6 py-8 sm:p-8 rounded-3xl shadow-2xl shadow-slate-900/20 text-center w-full max-w-sm border border-slate-100 transform transition-all animate-scale-up">
                
                {/* Premium SVG Success Ring Animation */}
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 mb-4 border border-emerald-100/50">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                        <svg className="w-5 h-5 animate-check" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>
                </div>

                
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Order Placed Successfully!
                </h2>
                
                <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-60 mx-auto">
                    Thank you for shopping! Your payment processing cleared and your items have been secured.
                </p>

                <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl py-2 px-3 inline-flex flex-col items-center gap-0.5 select-all">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Receipt Index</span>
                    <span className="text-xs font-mono font-bold text-slate-700 tracking-tight">
                        #ORD-20482
                    </span>
                </div>

        
                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold tracking-wide py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-slate-900/10 active:scale-[0.98] cursor-pointer"
                >
                    Continue Shopping
                </button>

            </div>
        </div>
    );
};

export default OrderPopup;