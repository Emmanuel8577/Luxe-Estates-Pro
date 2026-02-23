import React from 'react';
import { FaAward, FaBuilding, FaUsers } from 'react-icons/fa';
// 1. IMPORT THE IMAGE FROM ASSETS
import aboutUs from '../assets/aboutUs.svg'; 

const About = () => {
  return (
    <div className="pt-10 text-left">
      <section className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          {/* 2. USE THE IMPORTED VARIABLE */}
          <img src={aboutUs} alt="About Us" className="w-full h-auto" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">
            Redefining the Standard of <span className="text-blue-600">Modern Living</span>.
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Founded in 2020, Luxe Estates has quickly become the premier destination for high-end real estate. 
            We curate lifestyles, ensuring every client finds a sanctuary that reflects their success.
          </p>
        </div>
      </section>

      {/* Stats/Values Grid */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="bg-white p-10 rounded-3xl shadow-sm">
            <FaAward className="text-5xl text-blue-600 mx-auto mb-6" />
            <h4 className="text-xl font-bold mb-2">Excellence</h4>
            <p className="text-gray-500">Highest standards in every property we list.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-sm">
            <FaBuilding className="text-5xl text-blue-600 mx-auto mb-6" />
            <h4 className="text-xl font-bold mb-2">Innovation</h4>
            <p className="text-gray-500">Virtual tours and seamless digital buying.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-sm">
            <FaUsers className="text-5xl text-blue-600 mx-auto mb-6" />
            <h4 className="text-xl font-bold mb-2">Integrity</h4>
            <p className="text-gray-500">Transparent dealings and expert legal advice.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;