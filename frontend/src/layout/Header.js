import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from '../components/DropDown';
import NotifDropdown from '../components/NotifDropDown';
import { useUser } from '../hooks/Auth';

const Header = ({cUser}) => {
  const [role, setRole] = useState(null); 
  const location = useLocation();
  const { user } = useUser(); 

  useEffect(() => {
    if (user && Array.isArray(user.roles) && user.roles.length > 0) {
      setRole(user.roles.join());
    } else {
      setRole(null);
    }

    if (location.pathname === "/signin") {
      setRole(null);
    }
  }, [user, location.pathname]);

  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">BaBy-Sit</Link>
        </div>
        <nav className="flex space-x-4">
          {role === "ROLE_ADMIN" && (
            <>          
              <Link to="/users" className="hover:text-gray-200 font-bold">Users</Link>
              <Link to="/dashboard" className="hover:text-gray-200 font-bold">Dashboard</Link>
            </>
          )}
          {role === "ROLE_PARENT" && (
            <>
              <Link to="/workers" className="hover:text-gray-200 font-bold">Baby Sitters</Link>
            </>
          )}
          {role === "ROLE_WORKER" && (
            <>
              <Link to="/agenda" className="hover:text-gray-200 font-bold">Agenda</Link>
              <Link to="/dashboard" className="hover:text-gray-200 font-bold">Dashboard</Link>
            </>
          )}
          {cUser && role !== "ROLE_ADMIN" && (
            <Link to="/notifications" className="hover:text-gray-200 font-bold">Toutes les notifs</Link>
          )}
        </nav>

        {!role ? (
          <div className="space-x-4">
            <Link to="/signin" className="px-4 py-2 bg-white text-green-600  font-semibold rounded-md hover:bg-gray-100 font-bold">
              Sign In
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-blue-500 text-white border font-semibold rounded-md hover:bg-blue-700 font-bold">
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-1 font-bold">
            {cUser && role !== "ROLE_ADMIN" && <NotifDropdown placeholder="Notifications" user={cUser} />}
            <Dropdown placeholder="Profile" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
