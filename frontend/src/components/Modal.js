import React, { useState } from 'react';


const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
              &times;
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    );
};

export default Modal;
