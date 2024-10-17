import React, { useEffect, useState } from 'react';
import sendRequest from '../../services/aixosRequestFunction';
import { useLocation, useSearchParams } from 'react-router-dom';
import WeeklyCalendar from '../../components/Calendrier';


const ConatctProfile = ({user}) => {
    const location = useLocation();
    const [availabilities, setAvailabilities] = useState();
    const [worker, setWorker] = useState();
    const [service, setService] = useState();
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [availability, setAvailability] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);


    useEffect(() => {
        getWorkerAvailablities()
        const link =  location.search.split('?').filter(item => item !== '')
        const idWorker = link[0].replace('id=','') 
        setWorker(idWorker)
        const idService = link[1].replace('service=','') 
        setService(idService)
    }, [location]);

    const getBookingsOfWorker = async () => {
        const link =  location.search.split('?').filter(item => item !== '')
        const idWorker = link[0].replace('id=','') 
        if(idWorker) {
            try {
                const endpoint = `/api/bookings?service_provider_id=${idWorker}`; 
                const method = 'get';
                const response = await sendRequest(endpoint, method, {}, true);
                const filteredResult = response['hydra:member'];

                if(filteredResult.length > 0) {
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
                } else {
                    return []
                }
            } catch (error) {
                console.error('Failed to get Users:', error); 
            }
        }
    }

    const getWorkerAvailablities = async () => {
        const link =  location.search.split('?').filter(item => item !== '')
        const id = link[0].replace('id=','') 
        try {
            const endpoint = `/api/users/${id}/availabilities`; 
            const method = 'get';
            const response = await sendRequest(endpoint, method, {}, true);
            const result = response['hydra:member']
            const bookings = await getBookingsOfWorker();

            if( bookings && bookings.length > 0) {
                const updatedAvailabilities = result.map(availability => {
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
            } else {
                setAvailabilities(result)
                return result
            }
          

        } catch (error) {
            console.error('Failed to get Users:', error); 
        }
    };

    const sendNootif = async (workerId) => {
        if(workerId && user) {
            try {
                const endpoint = `/api/notifications`; 
                const method = 'post';
                const data = {
                    parent: `/api/users/${user.id}`,
                    seen: false,
                    seenByProvider: false,
                    serviceProvider: `/api/users/${workerId}`
                };
                const response = await sendRequest(endpoint, method, data, true);
                return response;
            } catch (error) {
                console.error('Failed to get Users:', error); 
            }
        } else {
            console.error('Fpas de worker id:', workerId); 
        }
     
    } 

    const handleParentReservation = async () => {
        if(user) {
            try {
                const endpoint = `/api/bookings`; 
                const method = 'post';
                const data = {
                    status: 'reserved',
                    date: new Date().toISOString(),
                    parentId: `/api/users/${user.id}`,
                    serviceProviderId: `/api/users/${worker}`,
                    serviceId: `/api/services/${service}`,
                    startTime: availability.start_time,
                    endTime: availability.end_time,
                    createAt: new Date().toISOString()
                };
                const response = await sendRequest(endpoint, method, data, true);
                closeAlert()
                sendNootif(worker)
                getWorkerAvailablities()
                return response;
            } catch (error) {
                console.error('Failed to get Users:', error); 
            }
        }

    }

    const handleAilablity = async (availability) => {
        if (availability.status !== 'reserved') {
            setShowAlert(true);
            setAvailability(availability)
        }
    } 

    const closeAlert = async () => {
        setShowAlert(false);
    };
 
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-4">
            {
                availabilities  ? <WeeklyCalendar  
                                        user={user} 
                                        availabilities={availabilities} 
                                        workerId={worker} 
                                        serivceId={service}  
                                        handleReservation={handleParentReservation}
                                        handlevailablity={handleAilablity}
                                        closeAlert={closeAlert}
                                        handleCloseModal={handleCloseModal}
                                        showAlert={showAlert}
                                        startTime={startTime}
                                        endTime={endTime}
                                        isModalOpen={isModalOpen}
                                        role={user.role.join()}
                                    /> : 'Loding s...'
                            
            }
        </div>
    </main>
  );
};

export default ConatctProfile;