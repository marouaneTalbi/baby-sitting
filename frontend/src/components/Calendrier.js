import React, { useEffect, useState } from 'react';
import sendRequest from '../services/aixosRequestFunction';
import useCurrentUser from '../hooks/useAuth';
import Alert from './Alert';
import Modal from './Modal';
import dateTimeService from '../services/dateTimeService';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeeklyCalendar = ({ availabilities, workerId=null, serivceId=null }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [availability, setAvailability] = useState();
    const user = useCurrentUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const [role, setRole] = useState();
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [day, setDay] = useState('');
    const [updatedAvailability, setUpdatedAvailability] = useState();

    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
    };

    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            setAvailability(availabilities)
            return response;
        } catch (error) {
            console.error('Failed to get Users:', error); 
        }
    }

    const handleCloseAlert = async () => {
        setShowAlert(false);
    };

    const handleReservation = async () => {
        if(user) {
            try {
                const endpoint = `/api/bookings`; 
                const method = 'post';
                const data = {
                    status: 'reserved',
                    date: new Date().toISOString(),
                    parentId: `/api/users/${user.id}`,
                    serviceProviderId: `/api/users/${workerId}`,
                    serviceId: `/api/services/${serivceId}`,
                    startTime: availability.start_time,
                    endTime: availability.end_time,
                    createAt: new Date().toISOString()
                };

                const response = await sendRequest(endpoint, method, data, true);
                handleCloseAlert()
                return response;
            } catch (error) {
                console.error('Failed to get Users:', error); 
            }
        }
      };

    const handlevailablity = async (availability) => {
        if (availability.status !== 'reserved') {
            setShowAlert(true);
            setAvailability(availability)
        }
    } 

    useEffect(() => {
        if(user) {
            setRole(user.role.join())
        }
    }, [user])

    const addAvailablity = (availability,day) => {
        setIsModalOpen(true)
        setDay(day)
        setUpdatedAvailability(availability)
    }       


  return (
    <>
        {showAlert && (
            <Alert 
                message="Etes vous sur de vouloir reserver ce creneau ?"
                primaryButtonText="Réserver"
                secondaryButtonText="Fermer"
                onPrimaryButtonClick={handleReservation}
                onSecondaryButtonClick={handleCloseAlert}
            />
        )}

        {
            user && role === 'ROLE_WORKER' &&
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Ajouter un creneau">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
                            Heure de début
                        </label>
                        <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            value={startTime}
                            onChange={handleStartTimeChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            min="8"
                            max="23:00"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">
                            Heure de fin
                        </label>
                        <input
                            type="time"
                            id="endTime"
                            name="endTime"
                            value={endTime}
                            onChange={handleEndTimeChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            min="08:00"
                            max="23:00"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Ajouter
                    </button>
                </form>
            </Modal>
        }

        <div className="grid grid-cols-8 gap-4">
            <div className="col-span-1 text-center font-bold">Heures</div>
            {daysOfWeek.map((day, index) => (
                <div key={index} className="text-center font-bold">{day}</div>
            ))}
            {Array.from({ length: 16 }, (_, i) => {
                const hour = i + 8; 

                return (
                <React.Fragment key={hour}>
                    <div className="col-span-1 text-center border border-gray-300">{`${hour}:00`}</div>

                        {daysOfWeek.map((day, index) => {
                        const availability = availabilities.find(a => a.day_of_week === day);
                        const startTime = availability ? new Date(availability.start_time).getHours() : null;
                        const endTime = availability ? new Date(availability.end_time).getHours() : null;
                        const isAvailable = availability && hour >= startTime && hour < endTime;
                        const isReserved = availability?.status === 'reserved';

                        return (
                            <>
                                {
                                    user && role !== 'ROLE_WORKER' ?
                                ( <div
                                        key={index}
                                        onClick={() => isAvailable && handlevailablity(availability)}
                                        className={`border border-gray-300 text-center ${
                                            isAvailable ? (isReserved ? 'bg-orange-200' : 'bg-green-200') : ''
                                        }`}
                                        >
                                        {isAvailable ? (isReserved ? 'Réservé' : 'Disponible') : ''}
                                    </div>) :

                                    ( <div
                                        key={index}
                                        onClick={() => !isReserved && addAvailablity(availability, day)}
                                        className={`border border-gray-300 text-center ${
                                            isAvailable ? (isReserved ? 'bg-orange-200' : 'bg-green-200') : ''
                                        }`}
                                        >
                                        {isAvailable ? (isReserved ? 'Réservé' : 'Disponible') : ''}
                                    </div>
                                    )
                                }
                            </>
                        );
                    })}
                </React.Fragment>
                );
            })}
        </div>
    </>

  );
};

export default WeeklyCalendar;
