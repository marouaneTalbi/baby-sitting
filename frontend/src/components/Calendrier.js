import React, { useEffect, useState } from 'react';
import sendRequest from '../services/aixosRequestFunction';
import useCurrentUser from '../hooks/useAuth';
import Alert from './Alert';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeeklyCalendar = ({ availabilities, workerId, serivceId }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [availability, setAvailability] = useState();
    const user = useCurrentUser();

    const handleCloseAlert = async () => {
        setShowAlert(false);
    };

    const handlePrimaryAction = async () => {
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

  return (
    <>
        {showAlert && (
            <Alert 
                message="Etes vous sur de vouloir reserver ce creneau ?"
                primaryButtonText="Réserver"
                secondaryButtonText="Fermer"
                onPrimaryButtonClick={handlePrimaryAction}
                onSecondaryButtonClick={handleCloseAlert}
            />
        )}

        <div className="grid grid-cols-8 gap-4">
        <div className="col-span-1 text-center font-bold">Heures</div>
        {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center font-bold">{day}</div>
        ))}
        {Array.from({ length: 16 }, (_, i) => {
            const hour = i + 8; // Commence à 8h et termine à 23h

            return (
            <React.Fragment key={hour}>
                {/* Colonne des heures */}
                <div className="col-span-1 text-center border border-gray-300">{`${hour}:00`}</div>

                {/* Colonnes pour chaque jour */}
                {daysOfWeek.map((day, index) => {
                const availability = availabilities.find(a => a.day_of_week === day);
                const startTime = availability ? new Date(availability.start_time).getHours() : null;
                const endTime = availability ? new Date(availability.end_time).getHours() : null;

                // Détermine si l'heure actuelle se situe dans une plage de disponibilité
                const isAvailable = availability && hour >= startTime && hour < endTime;
                const isReserved = availability?.status === 'reserved';

                return (
                    <div
                    key={index}
                    onClick={() => handlevailablity(availability)}
                    className={`border border-gray-300 text-center ${
                        isAvailable ? (isReserved ? 'bg-orange-200' : 'bg-green-200') : ''
                    }`}
                    >
                    {isAvailable ? (isReserved ? 'Réservé' : 'Disponible') : ''}
                </div>
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
