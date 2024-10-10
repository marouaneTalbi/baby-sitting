import React, { useEffect, useState } from 'react';
import WeeklyCalendar from '../../components/Calendrier';
import useCurrentUser from '../../hooks/useAuth';
import sendRequest from '../../services/aixosRequestFunction';

const Agenda = () => {
  const [availabilities, setAvailabilities] = useState();
  const user = useCurrentUser();

  const getMyAvailabilities = async () => {
    if(user?.id) {
      try {
        console.log('test')
        const endpoint = `/api/bookings?service_provider_id=${user.id}`; 
        const method = 'get';
        const response = await sendRequest(endpoint, method, {}, true);
        const crrentBookings = response['hydra:member'].map((item) => {
          return {
            id: item.id, 
            startTime: item.startTime, 
            endTime: item.endTime,
            status: item.status
          }
        })
        const availabilities = user.availabilities

        const updatedAvailabilities = availabilities.map(availability => {
          const isReserved = crrentBookings.some(booking => {
            const availabilityStartDate = new Date(availability.start_time).getTime();
            const bookingStartDate = new Date(booking.startTime).getTime();
      
            return availabilityStartDate === bookingStartDate;
          });
          if (isReserved) {
            return { ...availability, status: 'reserved' };
          }
      
          return availability;
        });

        return updatedAvailabilities;
      } catch (error) {
        console.error('Failed to get Users:', error); 
      }
    }

  }

  useEffect(() => {
    if(user) {
      getMyAvailabilities().then(setAvailabilities)
    }
  }, [user])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-4">
            {
                availabilities ? <WeeklyCalendar availabilities={availabilities}   /> : 'Loding ...'
            }
        </div>

    </main>
  );
};

export default Agenda;



