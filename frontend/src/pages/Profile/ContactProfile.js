import React, { useEffect, useState } from 'react';
import sendRequest from '../../services/aixosRequestFunction';
import { useLocation, useSearchParams } from 'react-router-dom';
import WeeklyCalendar from '../../components/Calendrier';
import Alert from '../../components/Alert';

const ConatctProfile = () => {
    const location = useLocation();
    const [user, setUser] = useState();
    const [availabilities, setAvailabilities] = useState();
    const [worker, setWorker] = useState();
    const [service, setService] = useState();


    useEffect(() => {
        getWorkers().then(setUser)
        const link =  location.search.split('?').filter(item => item !== '')
        const idWorker = link[0].replace('id=','') 
        setWorker(idWorker)
        const idService = link[1].replace('service=','') 
        setService(idService)
    }, [location]);

    const getBookingsOfWorker = async () => {
        try {
            const endpoint = `/api/bookings`; 
            const method = 'get';
            const response = await sendRequest(endpoint, method, {}, true);
            const filteredResult = response['hydra:member'];
            const newBookingArray = filteredResult.map((item) => {
                return {
                    status: item.status, 
                    startTime: item.start_time,
                    endTime: item.end_time,
                    createdAt: item.create_at
                }
            })
            const filterdBokings = newBookingArray.filter(item=> item.status === "reserved")
            return filterdBokings;
        } catch (error) {
            console.error('Failed to get Users:', error); 
        }
    }


    const getWorkers = async () => {
        const id =location.search.replace('?id=', '')
        try {
            const endpoint = `/api/users_availability/${id}`; 
            const method = 'get';
            const response = await sendRequest(endpoint, method, {}, true);
            const result = response.find(e => e.availabilities)
            const bookings = await getBookingsOfWorker()
          
            const updatedAvailabilities = result.availabilities.map(availability => {
                const isReserved = bookings.some(booking => {
                  const availabilityStartDate = new Date(availability.start_time).getTime();
                  const bookingStartDate = new Date(booking.startTime).getTime();
            
                  return availabilityStartDate === bookingStartDate;
                });
                if (isReserved) {
                  return { ...availability, status: 'reserved' };
                }
            
                return availability;
              });
            setAvailabilities(updatedAvailabilities)
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
                    availabilities ? <WeeklyCalendar availabilities={availabilities} workerId={worker} serivceId={service}  /> : 'Loding ...'
                }
            </div>
    </main>
  );
};

export default ConatctProfile;