import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers, FaEnvelope, FaHome, FaCheckCircle,
  FaTrash, FaChartLine, FaExclamationTriangle
} from "react-icons/fa";
import AddProperty from "../components/AddProperty";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState("overview");

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchData = async () => {
    try {
      const [userRes, inquiryRes] = await Promise.all([
        axios.get("/api/users", config),
        axios.get("/api/inquiries", config),
      ]);
      setUsers(userRes.data);
      setInquiries(inquiryRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch failed", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- ACTIONS ---

  const handleDeleteInquiry = async (id) => {
    if (window.confirm("Delete this inquiry?")) {
      try {
        await axios.delete(`/api/inquiries/${id}`, config);
        setInquiries(inquiries.filter(inq => inq._id !== id));
      } catch (err) { alert("Failed to delete"); }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure? This user will be removed forever.")) {
      try {
        await axios.delete(`/api/users/${id}`, config);
        setUsers(users.filter(u => u._id !== id));
      } catch (err) { alert("Error deleting user"); }
    }
  };

  const handleReplyEmail = (email) => {
    window.location.href = `mailto:${email}?subject=Regarding your Luxe Estates Inquiry`;
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-blue-600 animate-pulse">Loading Luxe Command Center...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar (Same as yours) */}
      <div className="w-full md:w-64 bg-gray-900 text-white p-8">
        <h2 className="text-2xl font-black mb-10 text-blue-500 tracking-tighter italic">LUXE ADMIN</h2>
        <nav className="space-y-4 text-left">
          <div onClick={() => setView("overview")} className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition ${view === "overview" ? "bg-blue-600" : "hover:bg-gray-800 text-gray-400"}`}><FaChartLine /> Overview</div>
          <div onClick={() => setView("users")} className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition ${view === "users" ? "bg-blue-600" : "hover:bg-gray-800 text-gray-400"}`}><FaUsers /> Users ({users.length})</div>
          <div onClick={() => setView("inquiries")} className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition ${view === "inquiries" ? "bg-blue-600" : "hover:bg-gray-800 text-gray-400"}`}><FaEnvelope /> Inquiries ({inquiries.length})</div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-12 text-left overflow-x-hidden">
        
        {view === "overview" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Executive Dashboard</h1>
              <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-900 transition shadow-lg"><FaHome /> Add New Property</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Registrations</p>
                <h2 className="text-5xl font-black">{users.length}</h2>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">New Messages</p>
                <h2 className="text-5xl font-black text-blue-600">{inquiries.length}</h2>
              </div>
            </div>
            
            <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold">Hello, Administrator</h2>
                    <p className="text-blue-200 mt-2 max-w-md text-lg">Your portfolio is currently attracting high engagement. Review the latest inquiries to close more deals.</p>
                </div>
                <FaChartLine className="absolute right-[-20px] bottom-[-20px] text-[15rem] text-white/5 rotate-12" />
            </div>
          </div>
        )}

        {view === "users" && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">Client Directory</h1>
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                  <tr>
                    <th className="p-6">Username</th>
                    <th className="p-6">Email Address</th>
                    <th className="p-6">Role</th>
                    <th className="p-6 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50/50 transition">
                      <td className="p-6 font-bold text-gray-900">{u.username}</td>
                      <td className="p-6 text-gray-600">{u.email}</td>
                      <td className="p-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-tighter ${u.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-blue-50 text-blue-600'}`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        {u.role !== 'admin' && (
                          <button onClick={() => handleDeleteUser(u._id)} className="text-red-300 hover:text-red-600 transition"><FaTrash /></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === "inquiries" && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">Inbox</h1>
            <div className="grid grid-cols-1 gap-4">
               {inquiries.length === 0 ? (
                 <div className="p-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100 text-gray-300 font-bold">No active inquiries.</div>
               ) : (
                 inquiries.map((inq) => (
                   <div key={inq._id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase italic tracking-widest">{inq.type}</span>
                           <span className="text-xs text-gray-400">{new Date(inq.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-xl font-black text-gray-900">{inq.name} <span className="text-gray-400 font-medium text-sm ml-2">— {inq.email}</span></h3>
                        <p className="text-gray-600 mt-2 leading-relaxed">"{inq.message}"</p>
                        {inq.subject && <p className="mt-4 text-xs font-bold text-blue-500 uppercase">Property: {inq.subject}</p>}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleReplyEmail(inq.email)} className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-600 transition shadow-lg">Reply</button>
                        <button onClick={() => handleDeleteInquiry(inq._id)} className="bg-red-50 text-red-500 p-4 rounded-2xl hover:bg-red-500 hover:text-white transition"><FaTrash /></button>
                      </div>
                   </div>
                 ))
               )}
            </div>
          </div>
        )}

        {showForm && <AddProperty setShowForm={setShowForm} />}
      </div>
    </div>
  );
};

export default AdminDashboard;