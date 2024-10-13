import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useCurrentUser from '../hooks/useAuth';
import Dropdown from '../components/DropDown';
import NotifDropdown from '../components/NotifDropDown';


const Header = () => {
  const user = useCurrentUser();
  const [role, setRole] = useState()
  const location = useLocation();

  useEffect(() => {
    if(user) {
      setRole(user.role.join())
    }
    if(location.pathname === "/signin") {
      setRole()
    }

  }, [user,location])


  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">BaBy-Sit</Link>
        </div>
        <nav className="flex space-x-4">
          {
            role && role === "ROLE_ADMIN" && (
              <>          
                <Link to="/" className="hover:text-gray-200">
                  Users
                </Link>
              </>
            ) 
          }
          {
           role && role === "ROLE_PARENT" && (
                <Link to="/workers" className="hover:text-gray-200">
                  Baby Sitters
                </Link>
            ) 
          }
          {
          role &&  role === "ROLE_WORKER" && (
                <Link to="/agenda" className="hover:text-gray-200">
                  Agenda
                </Link>
            ) 
          }
          {
            !role &&      
            <Link to="/" className="hover:text-gray-200">
                Home
            </Link>
          }
            <Link to="/about" className="hover:text-gray-200">
              About
            </Link>
        </nav>

        {
          !role &&
          <div className="space-x-4">
            <Link
              to="/signin"
              className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        }
        <div className="space-x-4">
          {  role && <NotifDropdown  placeholder="Notifications" /> }

        </div>
        <div className="space-x-4">
          {  role && <Dropdown  placeholder="Profile" /> }

        </div>
      </div>

    </header>
  );
};

export default Header;
