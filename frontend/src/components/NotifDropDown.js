import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sendRequest from '../services/aixosRequestFunction';

const NotifDropdown = ({ placeholder, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState([]);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const updateNotifStatus = async (notif) => {

    const role = user.role.join()
    let data ;

    if(role === 'ROLE_PARENT') {
         data = {
            seen: true,
            seenByProvider: notif.seen_by_provider,
            parent: `/api/users/${notif.parent.id}`,
            serviceProvider: `/api/users/${notif.service_provider.id}`

        };
    } else if (role !== 'ROLE_PARENT') {
         data = {
            seen: notif.seen,
            seenByProvider: true,
            parent: `/api/users/${notif.parent.id}`,
            serviceProvider: `/api/users/${notif.service_provider.id}`
        };
    }

    try {
        const endpoint = `/api/notifications/${notif.notification_id}`; 
        const method = 'put';
        const response = await sendRequest(endpoint, method, data, true);
        navigate("/notifications");
        return response;
    } catch (error) {
        console.error('Failed to get Users:', error); 
    }
  }

  useEffect(() => {
    if(user){
        getNotifs().then((notifs) => {
            if(notifs) {
                setOptions(notifs)
            }
        })
    } 
  }, [user]);

  const getNotifs = async () => { 
    if(user) {
        const role  = user.role.join()
        try {
            const endpoint = `/api/notification/users/${user.id}`; 
            const method = 'get';
            const response = await sendRequest(endpoint, method, {}, true);
            const updatedNotifications = response.map((notif) => {
                const message = role === 'ROLE_PARENT' ? 
                `Vous avez reserver un creneau de ${notif.service_provider.firstname} ${notif.service_provider.lastname}`
                :`${notif.service_provider.firstname} ${notif.service_provider.lastname} a reserver un de vos creneau ..`
                return {...notif, message: message}
            })
            return updatedNotifications;
        } catch (error) {
            console.error('Failed to get Users:', error); 
        }
    }
  }

  return (
    <div className="relative w-64">
        <button
            className={`px-4 py-2 text-left border rounded-lg shadow-sm focus:outline-none transition duration-300 ease-in-out ${isOpen ? 'border-blue-500' : 'border-gray-300'}`}
            onClick={toggleDropdown}
        >
            {selected || placeholder || 'Profile'}
            <span className={`ml-2 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
        </button>

        {isOpen && (
            <div className="absolute left-0 right-0 w-full mt-2 bg-gray-500 border border-gray-300 rounded-lg shadow-lg z-50">
                {options.length > 0 ? (
                    options.map((option, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition duration-200"
                            onClick={() => updateNotifStatus(option)}
                        >
                            {(user.role.join() === "ROLE_PARENT") && !option.seen && option.message}
                            {(user.role.join() !== "ROLE_PARENT") && !option.seenByProvider && option.message}
                            { !option.seen || !option.seenByProvider && 'Aucune notification disponible.'}

                        </div>
                    ))
                ) : (
                    <div className="px-4 py-2 cursor-pointer text-white bg-red-500">
                        Aucune notification disponible.
                    </div>
                )}
            </div>
        )}
    </div>
);
};

export default NotifDropdown;
