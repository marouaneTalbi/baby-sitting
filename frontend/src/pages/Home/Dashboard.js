import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-cover bg-center" >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 text-center text-white p-8 max-w-3xl">
        {/* Main Title */}
        <h1 className="text-5xl font-bold mb-6">
         Dashboard
        </h1>
      </div>
    </main>
  );
};

export default Dashboard;



