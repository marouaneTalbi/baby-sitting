import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../../assets/images/bg-home.jpg'; // Import a relevant background image

const Home = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 text-center text-white p-8 max-w-3xl">
        {/* Main Title */}
        <h1 className="text-5xl font-bold mb-6">
          Find or Offer Reliable Babysitting & Housekeeping Services
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl mb-8">
          Join our community to find trusted babysitters, housekeepers, or become one and connect with potential clients.
        </p>
        
        {/* Call-to-Action Buttons */}
        <div className="space-x-4">
          <Link
            to="/signup"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Sign Up as a Babysitter/Housekeeper
          </Link>
          <Link
            to="/signup"
            className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
          >
            Sign Up as a Parent
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;



