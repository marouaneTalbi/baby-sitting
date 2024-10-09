import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CardProfile = ({ profile }) => {
    const [service, setService] = useState();

    useEffect(() => {
        if (profile && profile.userServices.length > 0) {
            setService(profile.userServices[0].service)
        }
    }, [profile])

  return (
    <div className="w-80 rounded overflow-hidden shadow-lg bg-white p-6 m-4">
        <p className="text-gray-700 text-base"> {service && service.name}</p>
        <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{profile.firstname} {profile.lastname}</div>
        <p className="text-gray-700 text-base mb-2">Email: {profile.email}</p>
        <p className="text-gray-700 text-base mb-2">Address: {profile.profile.address}</p>
        <p className="text-gray-700 text-base mb-2">Phone: {profile.profile.phone}</p>
        <p className="text-gray-700 text-base mb-2">Rate: {profile.profile.rate_per_hour}€/hour</p>
        <p className="text-gray-700 text-base">Description: {service && service.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
            <Link  to={`/contact?id=${profile.id}?service=${service && service.id}`}
                   className="px-4 py-2 bg-gray-200 text-blue-600 font-semibold rounded-md hover:bg-gray-100mr-2 mb-2">
                Reserver
            </Link>
      </div>
    </div>
  );
};

export default CardProfile;
