import React, { useState } from 'react';
import axios from 'axios';

const AddProperty = ({ setInquiries, setShowForm }) => {
    const [formData, setFormData] = useState({
        title: '', price: '', location: '', description: '',
        image: '', beds: '', baths: '', area: '', garage: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("/api/properties", formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Property Added Successfully!");
            setShowForm(false);
            window.location.reload(); // Refresh to see the new listing
        } catch (err) {
            alert("Failed to add property");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-black text-gray-900">Add New Listing</h2>
                    <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-black text-2xl">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div className="md:col-span-2">
                        <label className="text-sm font-bold text-gray-600">Property Title</label>
                        <input className="w-full p-3 border rounded-xl" onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Modern Glass Villa" required />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600">Price</label>
                        <input className="w-full p-3 border rounded-xl" onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="$3,500,000" required />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600">Location</label>
                        <input className="w-full p-3 border rounded-xl" onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Malibu, CA" required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-sm font-bold text-gray-600">Image URL</label>
                        <input className="w-full p-3 border rounded-xl" onChange={(e) => setFormData({...formData, image: e.target.value})} placeholder="https://unsplash.com/..." required />
                    </div>
                    <div className="grid grid-cols-2 gap-2 md:col-span-2">
                        <input className="p-3 border rounded-xl" type="number" onChange={(e) => setFormData({...formData, beds: e.target.value})} placeholder="Beds" />
                        <input className="p-3 border rounded-xl" type="number" onChange={(e) => setFormData({...formData, baths: e.target.value})} placeholder="Baths" />
                        <input className="p-3 border rounded-xl" onChange={(e) => setFormData({...formData, area: e.target.value})} placeholder="Area (e.g. 5000 sqft)" />
                        <input className="p-3 border rounded-xl" type="number" onChange={(e) => setFormData({...formData, garage: e.target.value})} placeholder="Garage" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-sm font-bold text-gray-600">Description</label>
                        <textarea className="w-full p-3 border rounded-xl h-24" onChange={(e) => setFormData({...formData, description: e.target.value})} required></textarea>
                    </div>
                    <button className="md:col-span-2 bg-blue-600 text-white p-4 rounded-2xl font-bold hover:bg-gray-900 transition shadow-lg mt-4">
                        Publish Property
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;