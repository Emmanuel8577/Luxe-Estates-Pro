import { Link } from "react-router-dom";
import { FaHome, FaShieldAlt, FaChartLine, FaHeadset } from "react-icons/fa"; // Install react-icons
import house from "../assets/house.svg"


const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gray-50 pt-20 pb-32">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-8 animate-fade-in">
            <h1 className="text-6xl font-extrabold text-gray-900 leading-[1.1]">
              Elevate Your Living <br />
              <span className="text-blue-600">Without Limits.</span>
            </h1>
            <p className="text-gray-600 text-xl max-w-lg">
              Luxe Estates provides exclusive access to the world's most prestigious properties. 
              From sun-drenched coastal villas to modern urban penthouses.
            </p>
            <div className="flex space-x-4">
              <Link to="/gallery" className="bg-blue-600 text-white px-10 py-4 rounded-full shadow-xl hover:bg-blue-700 transition-all transform hover:scale-105">
                Explore Estates
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-16 md:mt-0 relative">
             <img src={house} alt="Hero" className="w-full h-auto drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-gray-900 py-12">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><h3 className="text-white text-4xl font-bold">$4.2B+</h3><p className="text-gray-400 text-sm mt-2">Property Sales</p></div>
          <div><h3 className="text-white text-4xl font-bold">2,500+</h3><p className="text-gray-400 text-sm mt-2">Active Listings</p></div>
          <div><h3 className="text-white text-4xl font-bold">99%</h3><p className="text-gray-400 text-sm mt-2">Client Satisfaction</p></div>
          <div><h3 className="text-white text-4xl font-bold">24hr</h3><p className="text-gray-400 text-sm mt-2">Support Response</p></div>
        </div>
      </section>

      {/* 3. OUR SERVICES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Expertise</h2>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto">We provide a comprehensive suite of services to ensure your real estate journey is seamless, secure, and sophisticated.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <FaHome />, title: "Property Mgmt", desc: "Complete oversight of your luxury assets." },
              { icon: <FaShieldAlt />, title: "Secure Escrow", desc: "Blockchain-verified transaction security." },
              { icon: <FaChartLine />, title: "Market Analysis", desc: "Real-time data for high-yield investments." },
              { icon: <FaHeadset />, title: "24/7 Concierge", desc: "Dedicated agents for elite clientele." }
            ].map((service, idx) => (
              <div key={idx} className="p-8 border border-gray-100 rounded-2xl hover:shadow-2xl transition group cursor-default">
                <div className="text-blue-600 text-4xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h4 className="text-xl font-bold mb-2">{service.title}</h4>
                <p className="text-gray-500 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TEASER GALLERY (Drawing Attention) */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold">Featured Listings</h2>
              <p className="text-gray-600 mt-2">A glimpse into premium living.</p>
            </div>
            <Link to="/gallery" className="text-blue-600 font-bold hover:underline">View All Properties &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="relative group overflow-hidden rounded-2xl">
                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80" className="w-full h-80 object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                  <h4 className="text-xl font-bold">The Glass House</h4>
                  <p className="text-sm opacity-80">Malibu, CA</p>
                </div>
             </div>
             
             <div className="relative group overflow-hidden rounded-2xl">
                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" className="w-full h-80 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                  <h4 className="text-xl font-bold">Sunset Villa</h4>
                  <p className="text-sm opacity-80">Miami, FL</p>
                </div>
             </div>
             <div className="relative group overflow-hidden rounded-2xl">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" className="w-full h-80 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                  <h4 className="text-xl font-bold">The Onyx Estate</h4>
                  <p className="text-sm opacity-80">Beverly Hills, CA</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. INTEGRATED CONTACT SECTION */}
      <section className="py-24 container mx-auto px-6">
        <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-12 text-white">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Ready to find your <br /> forever home?</h2>
            <p className="text-blue-100 mb-8">Schedule a private viewing with our senior consultants today. No obligation, just inspiration.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4"><FaHeadset /> <span>+1 (800) LUXE-LIFE</span></div>
              <div className="flex items-center gap-4"><FaShieldAlt /> <span>Verified Global Agent</span></div>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <form className="bg-white p-8 rounded-3xl space-y-4 text-gray-800 shadow-2xl">
              <input type="text" placeholder="Name" className="w-full p-4 bg-gray-100 rounded-xl outline-none" />
              <input type="email" placeholder="Email" className="w-full p-4 bg-gray-100 rounded-xl outline-none" />
              <button className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-gray-900 transition">Get Started</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;