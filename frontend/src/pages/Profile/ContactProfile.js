import React, { useEffect, useState } from 'react';
import sendRequest from '../../services/aixosRequestFunction';
import { useLocation } from 'react-router-dom';
import WeeklyCalendar from '../../components/Calendrier';

const ConatctProfile = () => {
    const location = useLocation();
    const [user, setUser] = useState()
    const [availabilities, setAvailabilities] = useState()


    useEffect(() => {
        getWorkers().then(setUser)
        getWorkers().then((e) => console.log(e))

    }, [])

    const getWorkers = async () => {
        const id =location.search.replace('?id=', '')
        try {
            const endpoint = `/api/users_availability/${id}`; 
            const method = 'get';
            const response = await sendRequest(endpoint, method, {}, true);
            const result = response.find(e => e.availabilities)
            setAvailabilities(result.availabilities)
            return response;
        } catch (error) {
            console.error('Failed to get Users:', error); 
        }
    };
 
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Calendrier des disponibilités</h1>
                {
                    availabilities ? <WeeklyCalendar availabilities={availabilities}  /> : 'Loding ...'
                }
            </div>
    </main>
  );
};

export default ConatctProfile;