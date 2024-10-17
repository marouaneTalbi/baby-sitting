import React, { useEffect, useState } from 'react';
import WeeklyCalendar from '../../components/Calendrier';
import sendRequest from '../../services/aixosRequestFunction';
import dateTimeService from '../../services/dateTimeService';

const Agenda = ({user}) => {
  const [availabilities, setAvailabilities] = useState();
  const [updatedAvailability, setUpdatedAvailability] = useState();
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const getMyAvailabilities = async () => {
    if(user?.id) {
      try {
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
        setAvailabilities(updatedAvailabilities)
        return updatedAvailabilities;
      } catch (error) {
        console.error('Failed to get Users:', error); 
      }
    }

  }

  const addNewAvailablity = (availability,day) => {
      handleOpenModal()
      setDay(day)
      setUpdatedAvailability(availability)
  }  

  const handleWorkerReservation = async (e) => {
     try {
        const { start, end } = dateTimeService(day, startTime, endTime);
        const endpoint = updatedAvailability ?  `/api/availabilities/${updatedAvailability.id}` :`/api/availabilities`; 
        const method = updatedAvailability ? 'put' : 'post';
        const data = {
            user: `/api/users/${user.id}`,
            dayOfWeek: day,
            startTime: start,
            endTime: end
        };
        const response = await sendRequest(endpoint, method, data, true);
        handleCloseModal()
        // setAvailability(availabilities)
        getMyAvailabilities()
        return response;
    } catch (error) {
        console.error('Failed to get Users:', error); 
    }
  }

  const closeAlert = async () => {
    setShowAlert(false);
  };

  useEffect(() => {
    getMyAvailabilities()
  }, [user])


  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
};

const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
};


  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-4">
            {
                availabilities ? 

                <WeeklyCalendar 
                availabilities={availabilities}
                addAvailability={addNewAvailablity}
                handleSubmit={handleWorkerReservation}
                handleEndTimeChange={handleEndTimeChange}
                handleStartTimeChange={handleStartTimeChange}
                startTime={startTime}
                handleCloseModal={handleCloseModal}
                endTime={endTime}
                isModalOpen={isModalOpen}
                user={user}
                role={user.role.join()}
                closeAlert={closeAlert}
                showAlert={showAlert}

                   /> : 'Loding ...'
            }
        </div>

    </main>
  );
};

export default Agenda;



