import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FaBed, FaBath, FaRulerCombined, FaCar, FaMapMarkerAlt,
  FaTimes, FaArrowRight, FaHeart, FaRegHeart, 
  FaWhatsapp, FaPhoneAlt, FaBuilding, FaEnvelope
} from "react-icons/fa";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);

  // Dynamic Base URL for deployment
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // 1. Fetch Property Data
        const res = await axios.get(`${API_BASE}/api/properties/${id}`);
        setProperty(res.data);

        // 2. Fetch Similar
        const allRes = await axios.get(`${API_BASE}/api/properties`);
        const similar = allRes.data
          .filter((p) => p._id !== id && p.location === res.data.location)
          .slice(0, 3);
        setRelated(similar.length > 0 ? similar : allRes.data.filter(p => p._id !== id).slice(0, 3));

        // 3. User Sync & Specific Favorites
        if (token) {
          const userRes = await axios.get(`${API_BASE}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          const currentUserId = userRes.data._id;
          setUserId(currentUserId);
          
          // Use a User-Specific Key to prevent "bleeding" favorites
          const userFavKey = `favs_${currentUserId}`;
          const serverFavs = userRes.data.favorites.map(f => typeof f === 'string' ? f : f._id);
          
          localStorage.setItem(userFavKey, JSON.stringify(serverFavs));
          setIsFav(serverFavs.includes(id));
          window.dispatchEvent(new Event("favUpdated"));
        } else {
          // If Guest, use guest key or clear
          setIsFav(false);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id, API_BASE]);

  const handleToggleFav = async () => {
    const token = localStorage.getItem("token");
    if (!token || !userId) return alert("Please login to save favorites");

    const userFavKey = `favs_${userId}`;
    const newFavStatus = !isFav;
    setIsFav(newFavStatus);

    let savedFavs = JSON.parse(localStorage.getItem(userFavKey)) || [];
    if (newFavStatus) {
      if (!savedFavs.includes(id)) savedFavs.push(id);
    } else {
      savedFavs = savedFavs.filter(favId => favId !== id);
    }
    
    localStorage.setItem(userFavKey, JSON.stringify(savedFavs));
    window.dispatchEvent(new Event("favUpdated"));

    try {
      await axios.post(`${API_BASE}/api/users/favorite/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) { 
      console.error("Sync with server failed"); 
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-blue-600 animate-pulse text-xl">Loading Luxury...</div>;
  if (!property) return <div className="h-screen flex items-center justify-center">Property Not Found</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative text-left">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[400px] md:h-[600px]">
          <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <div className="flex justify-between items-center">
            <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-bold text-xs uppercase">Exclusive Listing</span>
            <button onClick={handleToggleFav} className={`p-4 rounded-2xl border-2 transition-all ${isFav ? "bg-red-50 border-red-200 text-red-500" : "bg-white border-gray-100 text-gray-300"}`}>
              {isFav ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </button>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">{property.title}</h1>
          <p className="text-3xl md:text-4xl font-bold text-blue-600">₦{property.price}</p>
          <div className="flex items-center gap-2 text-gray-500 text-xl"><FaMapMarkerAlt className="text-blue-500" /> {property.location}</div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-gray-100 text-center">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-3xl"><FaBed className="text-blue-500 mb-2 text-2xl" /><span className="font-black text-xl">{property.beds}</span><span className="text-xs text-gray-400 font-bold uppercase">Beds</span></div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-3xl"><FaBath className="text-blue-500 mb-2 text-2xl" /><span className="font-black text-xl">{property.baths}</span><span className="text-xs text-gray-400 font-bold uppercase">Baths</span></div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-3xl"><FaRulerCombined className="text-blue-500 mb-2 text-2xl" /><span className="font-black text-xl">{property.area}</span><span className="text-xs text-gray-400 font-bold uppercase">Sqft</span></div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-3xl"><FaCar className="text-blue-500 mb-2 text-2xl" /><span className="font-black text-xl">{property.garage}</span><span className="text-xs text-gray-400 font-bold uppercase">Garage</span></div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">{property.description}</p>
          <button onClick={() => setShowModal(true)} className="w-full bg-gray-900 text-white py-6 rounded-[2rem] font-bold text-xl hover:bg-blue-600 transition-all shadow-xl">Contact Listing Agent</button>
        </div>
      </div>

      {/* Similar Estates Section */}
      <div className="mt-20 border-t border-gray-100 pt-20">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-black text-gray-900">Similar Estates</h2>
          <Link to="/gallery" className="text-blue-600 font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">View All <FaArrowRight /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {related.map((item) => (
            <div key={item._id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-50">
              <div className="h-64 overflow-hidden relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 px-4 py-2 rounded-full font-bold text-sm">₦ {item.price}</div>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-bold truncate">{item.title}</h4>
                <Link to={`/property/${item._id}`} className="block mt-4 text-center border-2 border-gray-900 py-3 rounded-2xl font-bold hover:bg-gray-900 hover:text-white transition-all">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-gray-400 hover:text-red-500 transition"><FaTimes size={24} /></button>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-black shadow-lg">L</div>
              <h2 className="text-3xl font-black text-gray-900">Get In Touch</h2>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Luxe Estates Concierge</p>
            </div>
            <div className="space-y-4 mt-8">
              <a href="https://wa.me/2348000000000" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-5 bg-green-50 rounded-2xl border border-green-100 hover:bg-green-100 transition">
                <FaWhatsapp className="text-green-500 text-3xl" />
                <div>
                  <p className="text-[10px] font-bold text-green-600 uppercase">WhatsApp</p>
                  <p className="text-lg font-bold text-gray-800">+234 800 000 0000</p>
                </div>
              </a>
              <a href="tel:+2349000000000" className="flex items-center gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-100 hover:bg-blue-100 transition">
                <FaPhoneAlt className="text-blue-500 text-2xl" />
                <div>
                  <p className="text-[10px] font-bold text-blue-600 uppercase">Direct Line</p>
                  <p className="text-lg font-bold text-gray-800">+234 900 000 0000</p>
                </div>
              </a>
            </div>
            <button onClick={() => setShowModal(false)} className="mt-8 w-full py-4 text-gray-400 font-bold text-sm hover:text-gray-900 transition">Close Details</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;