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
    <div className="w-80 rounded-lg overflow-hidden shadow-lg bg-white p-6 m-4 transition-transform transform hover:scale-105">
      <p className="text-blue-500 text-lg font-semibold">{service && service.name}</p>
      <div className="py-4 border-b border-gray-200">
          <div className="font-bold text-2xl text-gray-800 mb-2">{profile.firstname} {profile.lastname}</div>
          <p className="text-gray-600 text-sm mb-2">Email: <span className="text-gray-800">{profile.email}</span></p>
          <p className="text-gray-600 text-sm mb-2">Address: <span className="text-gray-800">{profile.profile?.address}</span></p>
          <p className="text-gray-600 text-sm mb-2">Phone: <span className="text-gray-800">{profile.profile?.phone}</span></p>
          <p className="text-gray-600 text-sm mb-2">Rate: <span className="text-green-600 font-semibold">{profile.profile?.rate_per_hour}€/hour</span></p>
      </div>

      <div className="py-4">
          <p className="text-gray-600 text-sm">Description:</p>
          <p className="text-gray-700 text-base">{service && service?.description}</p>
      </div>

      <div className="flex justify-center">
        <Link  to={`/contact?id=${profile.id}?service=${service && service.id}`}
                className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-colors"
              >
                  Reserver
        </Link>
      </div>
  </div>

  );
};

export default CardProfile;
