import React, { useState } from "react";
import API from "../api"; // This now works because the file exists!
import contactUs from "../assets/contactUs.svg";
import { FaCheckCircle, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const fullName = `${formData.firstName} ${formData.lastName}`;

    try {
      // Sending data to https://luxe-estates-pro.onrender.com/api/inquiries
      await API.post("/inquiries", {
        name: fullName,
        email: formData.email,
        message: formData.message,
        type: "contact",
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      alert(err.response?.data?.message || "Error sending message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row gap-16 items-center">
      {/* Left Side: Branding */}
      <div className="md:w-1/2 text-left">
        <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          Let's Talk About Your <br />
          <span className="text-blue-600 font-black">Future Home.</span>
        </h2>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          Have a specific property in mind or want to sell your estate? Our
          senior consultants are ready to assist you.
        </p>
        <img src={contactUs} alt="Contact Illustration" className="w-64 h-auto opacity-80" />
      </div>

      {/* Right Side: Form / Success Message */}
      <div className="md:w-1/2 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 min-h-[500px] flex flex-col justify-center">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you're looking for..."
              rows="4"
              required
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            ></textarea>

            <button
              type="submit"
              disabled={isSending}
              className={`w-full ${isSending ? "bg-gray-400" : "bg-blue-600 hover:bg-gray-900"} text-white py-5 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2`}
            >
              {isSending ? "Sending..." : <><FaPaperPlane /> Send Inquiry</>}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6 animate-in zoom-in duration-300">
            <div className="flex justify-center">
              <FaCheckCircle className="text-green-500 text-8xl" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Message Received!</h2>
            <p className="text-gray-500">
              Thank you for reaching out. We will contact you at <strong>{formData.email}</strong> shortly.
            </p>
            <button onClick={() => setSubmitted(false)} className="text-blue-600 font-bold hover:underline">
              Send another message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;