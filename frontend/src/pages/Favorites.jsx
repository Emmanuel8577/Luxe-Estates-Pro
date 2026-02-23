import React, { useState, useEffect } from 'react';
// 1. Change this import to use your new utility
import API from '../api'; 
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Favorites = () => {
  const [favProperties, setFavProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavs = async () => {
      const savedIds = JSON.parse(localStorage.getItem("local_favs")) || [];
      if (savedIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        // 2. Use the 'API' utility here. 
        // It automatically adds the 'https://luxe-estates-pro.onrender.com/api' prefix
        const res = await API.get("/properties");
        
        const filtered = res.data.filter(p => savedIds.includes(p._id));
        setFavProperties(filtered);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavs();
  }, []);

  const removeFav = (id) => {
    const savedIds = JSON.parse(localStorage.getItem("local_favs")) || [];
    const updated = savedIds.filter(favId => favId !== id);
    localStorage.setItem("local_favs", JSON.stringify(updated));
    setFavProperties(favProperties.filter(p => p._id !== id));
    window.dispatchEvent(new Event("favUpdated"));
  };

  if (loading) return <div className="p-20 text-center font-bold">Loading your collection...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-left">
      <h1 className="text-5xl font-black mb-4">Your Collection</h1>
      <p className="text-gray-500 mb-12">Luxury estates you've curated.</p>

      {favProperties.length === 0 ? (
        <div className="bg-gray-50 rounded-[3rem] p-20 text-center">
          <p className="text-2xl font-bold text-gray-400 mb-6">No properties saved yet.</p>
          <Link to="/gallery" className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold">Browse Gallery</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {favProperties.map(p => (
            <div key={p._id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100">
              <div className="relative h-64">
                <img src={p.image} className="w-full h-full object-cover" alt={p.title} />
                <button onClick={() => removeFav(p._id)} className="absolute top-5 right-5 p-3 bg-white text-red-500 rounded-full shadow-lg hover:bg-red-50 transition">
                  <FaTrash size={18} />
                </button>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold truncate">{p.title}</h3>
                <p className="text-blue-600 font-black mb-6">₦{p.price.toLocaleString()}</p>
                <Link to={`/property/${p._id}`} className="block text-center bg-gray-900 text-white py-4 rounded-2xl font-bold">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;