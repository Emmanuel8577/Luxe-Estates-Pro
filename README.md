# 🏛️ Luxe Estates | Premium Real Estate Platform

Luxe Estates is a high-end, full-stack real estate application designed for luxury property listings. It provides a seamless experience for potential buyers to browse properties, save favorites, and contact agents, while offering a robust management suite for administrators.

![Luxe Estates Banner](https://via.placeholder.com/1000x400?text=Luxe+Estates+Premium+Real+Estate)

---

## ✨ Key Features

### 💎 User Experience
- **Exclusive Listings:** High-definition property cards with detailed specs (Beds, Baths, Area).
- **Personalized Favorites:** Secure, user-specific "Heart" system to save properties.
- **Dynamic Property Details:** Intelligent "Similar Estates" suggestions based on location.
- **Luxury UI:** Fully responsive, modern design built with Tailwind CSS.

### 🛠️ Admin Features
- **Centralized Dashboard:** Real-time stats for total clients and pending inquiries.
- **Inventory Management:** Full CRUD (Create, Read, Update, Delete) for property listings.
- **Inquiry System:** Automated email notifications via **Resend API**.
- **User Management:** Secure directory of registered clients with role-based access.

### 🛡️ Security & Performance
- **JWT Authentication:** Secure login and registration flow.
- **Protected Routes:** Admin-only access to sensitive management tools.
- **RESTful API:** Clean, modular backend architecture.

---

## 🚀 Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Resend API (Emails)

**Deployment:**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Emmanuel8577/Luxe-Estates-Fullstack.git](https://github.com/Emmanuel8577/Luxe-Estates-Fullstack.git)
   cd Luxe-Estates-Fullstack
   Install Backend Dependencies:Bashcd backend
npm install
Install Frontend Dependencies:Bashcd ../
npm install
Environment Variables:Create a .env file in the backend folder and add:Code snippetMONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=re_your_key
PORT=5000
Run the App:Bash
# From the root directory
npm run dev
📄 LicenseDistributed under the MIT License. 
See LICENSE for more information.Developed by Apex Technovate LTD Building the future of luxury real estate technology.
