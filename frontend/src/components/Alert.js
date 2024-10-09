import React from 'react';

const Alert = ({ message, primaryButtonText, secondaryButtonText, onPrimaryButtonClick, onSecondaryButtonClick }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center"
      role="alert"
    >
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 max-w-sm rounded shadow-lg">
        <p className="font-bold">Attention</p>
        <p>{message}</p>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={onPrimaryButtonClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {primaryButtonText}
          </button>
          <button
            onClick={onSecondaryButtonClick}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;