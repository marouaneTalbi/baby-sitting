import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dropdown = ({ placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState([]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);

    if(option === 'Profile') {
        navigate("/profile");
    } else if(option =='Deconnexion') {
        navigate("/signin");
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    }
  };

  const map = ['Profile', 'Deconnexion',];

  useEffect(() => {
    setOptions(map); 
  }, []);

  return (
    <div className="relative w-64">
      <button
        className={`px-4 py-2 text-left  border rounded-lg shadow-sm focus:outline-none transition duration-300 ease-in-out ${isOpen ? 'border-blue-500' : 'border-gray-300'}`}
        onClick={toggleDropdown}
      >
        {selected || placeholder || 'Profile'}
        <span className={`ml-2 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 w-full mt-2 bg-gray-500 border border-gray-300 rounded-lg shadow-lg z-50">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition duration-200"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
