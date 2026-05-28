// import React, { useEffect, useState } from "react";
// import axios from "axios";
// //import Product from "../../../Backend/models/Product";

// const AdminDashboard = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState(true);
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState("");
//   const [productData, setProductData] = useState({_id: "",title: "",price: ""});

//   const createProduct = async (e) => {

//     e.preventDefault();

//     try {
//       const productData = {
//         title,
//         description,
//         price,
//         stock,
//         category,
//         image,
//       };

//       const response = await axios.post(`http://localhost:3000/product/createProduct`,productData,);
//       console.log(response?.data);

//       alert("Product created successfully");

//       setTitle("");
//       setDescription("");
//       setPrice("");
//       setStock(true);
//       setCategory("");
//       setImage("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateProduct = async (e) => {

//     e.preventDefault();

//     try {
//       const response = await axios.put(
//         `http://localhost:3000/product/updateProduct/${productData._id}`,
//         productData,
//       );
//       console.log(response?.data);

//       alert("Product edited successfully");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteProduct = async (e) => {

//     e.preventDefault();

//     try {
//       const response = await axios.delete(`http://localhost:3000/product/deleteProduct/${productData._id}`);

//       console.log(response?.data);

//       alert("Poduct deleted successfully");

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//   <div style={{ padding: "20px" }}>

//     <h1>Admin Dashboard</h1>

//     {/* Update Product Form */}
//     <form onSubmit={updateProduct}>

//       <input
//         type="text"
//         placeholder="Product ID"
//         value={productData._id}
//         onChange={(e) =>
//           setProductData({
//             ...productData,
//             _id: e.target.value,
//           })
//         }
//       />

//       <br /><br />

//       <input
//         type="text"
//         placeholder="Product Name"
//         value={productData.title}
//         onChange={(e) =>
//           setProductData({
//             ...productData,
//             title: e.target.value,
//           })
//         }
//       />

//       <br /><br />

//       <input
//         type="number"
//         placeholder="Price"
//         value={productData.price}
//         onChange={(e) =>
//           setProductData({
//             ...productData,
//             price: e.target.value,
//           })
//         }
//       />

//       <br /><br />

//       <button type="submit">
//         Update Product
//       </button>

//     </form>

//     <br /><hr /><br />

//     {/* Delete Product Form */}
//     <form onSubmit={deleteProduct}>

//       <input
//         type="text"
//         placeholder="Product ID"
//         value={productData._id}
//         onChange={(e) =>
//           setProductData({
//             ...productData,
//             _id: e.target.value,
//           })
//         }
//       />

//       <br /><br />

//       <button type="submit">
//         Delete Product
//       </button>

//     </form>

//     <br /><hr /><br />

//     {/* Create Product Form */}
//     <form onSubmit={createProduct}>

//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <br /><br />

//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//       <br /><br />

//       <input
//         type="number"
//         placeholder="Price"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//       />

//       <br /><br />

//       <input
//         type="text"
//         placeholder="Category"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//       />

//       <br /><br />

//       <input
//         type="text"
//         placeholder="Image URL"
//         value={image}
//         onChange={(e) => setImage(e.target.value)}
//       />

//       <br /><br />

//       <label>
//         In Stock

//         <input
//           type="checkbox"
//           checked={stock}
//           onChange={(e) => setStock(e.target.checked)}
//         />

//       </label>

//       <br /><br />

//       <button type="submit">
//         Create Product
//       </button>

//     </form>

//   </div>
// );
  
// };

// export default AdminDashboard;


import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

<>
   <Navbar />

   <div>
      Admin Dashboard Content
   </div>
</>

const AdminDashboard = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState("create"); // Options: "create" | "update" | "delete"

  // Create Product States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(true);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  // Update/Delete Unified State
  const [productData, setProductData] = useState({ _id: "", title: "", price: "" });

  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // Clear all states helper
  const clearNotifications = () => setStatus({ type: "", message: "" });

  const createProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearNotifications();

    try {
      const payload = { title, description, price: Number(price), stock, category, image };
      const response = await axios.post(`http://localhost:3000/product/createProduct`, payload);
      console.log(response?.data);

      setStatus({ type: "success", message: "Product created and published successfully!" });
      
      // Reset Creation States
      setTitle("");
      setDescription("");
      setPrice("");
      setStock(true);
      setCategory("");
      setImage("");
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: error?.response?.data?.message || "Failed to create product." });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearNotifications();

    try {
      const response = await axios.put(
        `http://localhost:3000/product/updateProduct/${productData._id}`,
        { title: productData.title, price: Number(productData.price) }
      );
      console.log(response?.data);
      setStatus({ type: "success", message: "Product details modified successfully." });
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: error?.response?.data?.message || "Failed to modify product." });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you absolutely sure you want to delete this listing? This action cannot be undone.")) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    clearNotifications();

    try {
      const response = await axios.delete(`http://localhost:3000/product/deleteProduct/${productData._id}`);
      console.log(response?.data);
      setStatus({ type: "success", message: "Product dropped from inventory sync records." });
      setProductData({ _id: "", title: "", price: "" });
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: error?.response?.data?.message || "Failed to drop product entry." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Top Header Panel */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-base shadow-md">
            E
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Admin Control Center</h1>
            <p className="text-xs text-slate-400">Inventory Global CRUD Operations</p>
          </div>
        </div>

        {/* Dynamic Tab Switching Anchors */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200/40">
          <button
            onClick={() => { setActiveTab("create"); clearNotifications(); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === "create" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Create Product
          </button>
          <button
            onClick={() => { setActiveTab("update"); clearNotifications(); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === "update" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Update Metrics
          </button>
          <button
            onClick={() => { setActiveTab("delete"); clearNotifications(); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === "delete" ? "bg-white text-rose-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Remove Entry
          </button>
        </div>
      </header>

      {/* Main Workspace Workspace */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        
        {/* Universal Feedback Alert Strip */}
        {status.message && (
          <div className={`mb-6 p-4 rounded-xl text-sm border flex items-start gap-2.5 shadow-sm animate-fade-in ${
            status.type === "success" 
              ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
              : "bg-rose-50 border-rose-100 text-rose-800"
          }`}>
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d={status.type === "success" ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0Zm-9 3.75h.008v.008H12v-.008Z"} />
            </svg>
            <span className="font-medium">{status.message}</span>
          </div>
        )}

        {/* TAB 1: CREATE COMPONENT CONTAINER */}
        {activeTab === "create" && (
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">Publish New Listing</h2>
              <p className="text-xs text-slate-400 mt-0.5">Populate new parameters to map values to client catalogs.</p>
            </div>

            <form onSubmit={createProduct} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name / Title</label>
                <input
                  type="text" required placeholder="e.g., Premium Leather Running Sneakers" value={title} disabled={isLoading}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-500 focus:bg-white transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Category</label>
                  <input
                    type="text" required placeholder="e.g., Footwear, Sports" value={category} disabled={isLoading}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-500 focus:bg-white transition"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">MSRP Retail Price ($)</label>
                  <input
                    type="number" required min="0" step="0.01" placeholder="0.00" value={price} disabled={isLoading}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Listing Description</label>
                <textarea
                  required rows="3" placeholder="Describe materials, dimensions, features..." value={description} disabled={isLoading}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-500 focus:bg-white transition resize-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Storefront Image Address URL</label>
                <input
                  type="url" required placeholder="https://images.unsplash.com/your-photo-path" value={image} disabled={isLoading}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-500 focus:bg-white transition"
                />
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center justify-between mt-2">
                <div>
                  <span className="text-sm font-semibold text-slate-800 block">Inventory Distribution Flag</span>
                  <p className="text-[11px] text-slate-400">Initialize stock allocations as immediately available</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input type="checkbox" checked={stock} disabled={isLoading} onChange={(e) => setStock(e.target.checked)} className="sr-only peer" />
                  <div className="w-10 h-5.5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              <button type="submit" disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm py-3 rounded-xl mt-4 transition shadow-md shadow-emerald-600/10 active:scale-[0.99] disabled:opacity-40 cursor-pointer">
                {isLoading ? "Broadcasting Records..." : "Create Product Data"}
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: UPDATE METRICS CONTAINER */}
        {activeTab === "update" && (
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">Modify Existing Document</h2>
              <p className="text-xs text-slate-400 mt-0.5">Locate database object strings to alter price thresholds or branding titles.</p>
            </div>

            <form onSubmit={updateProduct} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target MongoDB Reference ID</label>
                <input
                  type="text" required placeholder="e.g., 64f1c2de79b12a001fb45c89" value={productData._id} disabled={isLoading}
                  onChange={(e) => setProductData({ ...productData, _id: e.target.value })}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white transition"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Revised Product Name</label>
                <input
                  type="text" required placeholder="Update item catalog heading" value={productData.title} disabled={isLoading}
                  onChange={(e) => setProductData({ ...productData, title: e.target.value })}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white transition"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Revised Pricing Structure ($)</label>
                <input
                  type="number" required placeholder="Adjust listing values" value={productData.price} disabled={isLoading}
                  onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white transition"
                />
              </div>

              <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-3 rounded-xl mt-4 transition shadow-md shadow-indigo-600/10 active:scale-[0.99] disabled:opacity-40 cursor-pointer">
                {isLoading ? "Executing Operations..." : "Push Modifications Live"}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: DESTRUCTIVE ERASURE CONTAINER */}
        {activeTab === "delete" && (
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-900">Purge Catalog Records</h2>
              <p className="text-xs text-slate-400 mt-0.5">Input target sequence tracking keys to cleanly isolate and drop assets from active stock lines.</p>
            </div>

            <div className="mb-6 p-3.5 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-800 leading-relaxed">
              <strong>Crucial Operational Warning:</strong> Dropping index files cleanly prevents shopper checkout actions. Cached image pointers or order reference tables might still retain this exact ID.
            </div>

            <form onSubmit={deleteProduct} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Tracking ID Signature</label>
                <input
                  type="text" required placeholder="e.g., 64f1c2de79b12a001fb45c89" value={productData._id} disabled={isLoading}
                  onChange={(e) => setProductData({ ...productData, _id: e.target.value })}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-800 placeholder-slate-400 outline-none focus:border-rose-500 focus:bg-white transition"
                />
              </div>

              <button type="submit" disabled={isLoading || !productData._id} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm py-3 rounded-xl mt-4 transition shadow-md shadow-rose-600/10 active:scale-[0.99] disabled:opacity-40 cursor-pointer">
                {isLoading ? "Purging Nodes..." : "Permanently Erase Product"}
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
