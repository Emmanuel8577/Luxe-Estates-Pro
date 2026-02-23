import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";

// Update baseURL to use environment variables for deployment, fallback to localhost
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Import Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import PropertyDetail from "./pages/PropertyDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Favorites from "./pages/Favorites";

// Import Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// --- HELPER COMPONENTS ---

// Luxury Loader Component
const LuxuryLoader = () => (
  <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
    <div className="w-20 h-20 border-2 border-gray-900 border-t-blue-600 rounded-full animate-spin mb-6"></div>
    <h2 className="text-2xl font-black tracking-widest uppercase text-gray-900">Luxe Estates</h2>
    <p className="text-gray-400 mt-2 italic">Opening the doors to luxury...</p>
  </div>
);

// Admin Route Guard
const AdminRoute = ({ user, loading, children }) => {
  if (loading) return <LuxuryLoader />;

  if (!user) {
    console.log("AdminRoute: No user found, redirecting...");
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    console.log(`AdminRoute: User is not admin. Role: ${user.role}. Redirecting...`);
    return <Navigate to="/" replace />;
  }

  return children;
};

// --- MAIN APP COMPONENT ---

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <LuxuryLoader />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} setUser={setUser} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth Routes */}
            <Route
              path="/login"
              element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />}
            />

            {/* Protected Routes */}
            <Route
              path="/gallery"
              element={user ? <Gallery /> : <Navigate to="/login" />}
            />
            <Route
              path="/property/:id"
              element={user ? <PropertyDetail user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/favorites"
              element={user ? <Favorites /> : <Navigate to="/login" />}
            />

            {/* Admin Route */}
            <Route
              path="/admin"
              element={
                <AdminRoute user={user} loading={loading}>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;