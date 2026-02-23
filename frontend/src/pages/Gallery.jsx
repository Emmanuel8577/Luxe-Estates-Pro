import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [properties, setProperties] = useState([]);
  const [userFavs, setUserFavs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Load from Backend
        const res = await axios.get("http://localhost:5000/api/properties");
        setProperties(res.data);

        // 2. Sync Favorites from LocalStorage first (Instant)
        const savedFavs = JSON.parse(localStorage.getItem("local_favs")) || [];
        setUserFavs(savedFavs);

        // 3. Sync from Server (Database) if logged in
        const token = localStorage.getItem("token");
        if (token) {
          const userRes = await axios.get("http://localhost:5000/api/users/me", {
            headers: { Authorization: `Bearer ${token}` }
          });
          const serverFavs = userRes.data.favorites.map(f => typeof f === 'string' ? f : f._id);
          setUserFavs(serverFavs);
          localStorage.setItem("local_favs", JSON.stringify(serverFavs));
          
          // Notify Navbar to update count from server sync
          window.dispatchEvent(new Event("favUpdated"));
        }
      } catch (err) {
        console.error("Gallery fetch error", err);
      }
    };
    fetchData();
  }, []);

  const toggleFav = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to save favorites");

    // Optimistic Update logic
    const isAlreadyFav = userFavs.includes(id);
    const updatedFavs = isAlreadyFav 
      ? userFavs.filter(favId => favId !== id) 
      : [...userFavs, id];

    setUserFavs(updatedFavs);
    localStorage.setItem("local_favs", JSON.stringify(updatedFavs));

    // --- TRIGGER NAVBAR UPDATE ---
    window.dispatchEvent(new Event("favUpdated"));

    try {
      await axios.post(`http://localhost:5000/api/users/favorite/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Failed to sync with server");
      // Optional: Revert on error
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-black mb-12">Luxury Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {properties.map(p => (
          <div key={p._id} className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100">
            <button 
              onClick={() => toggleFav(p._id)}
              className="absolute top-5 right-5 z-10 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-md transition-transform active:scale-90"
            >
              {userFavs.includes(p._id) ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-400" />}
            </button>
            <img src={p.image} className="w-full h-72 object-cover" alt={p.title} />
            <div className="p-8 text-left">
              <h3 className="text-2xl font-bold">{p.title}</h3>
              <p className="text-blue-600 font-black mb-4">₦{p.price}</p>
              <Link to={`/property/${p._id}`} className="block text-center bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-colors">
                View Property
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;