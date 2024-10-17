import React, { useEffect, useState } from 'react';
import Alert from './Alert';
import Modal from './Modal';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeeklyCalendar = ({
    showAlert, startTime, endTime, role, closeAlert, addAvailability,
    handlevailablity, handleStartTimeChange, handleEndTimeChange, isModalOpen,
    handleSubmit, handleReservation, user, availabilities, handleCloseModal
}) => {


  return (
    <>
        {showAlert && (
            <Alert 
                message="Etes vous sur de vouloir reserver ce creneau ?"
                primaryButtonText="Réserver"
                secondaryButtonText="Fermer"
                onPrimaryButtonClick={()=>handleReservation()}
                onSecondaryButtonClick={closeAlert}
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
                                    (
                                    <div
                                        key={index}
                                        onClick={() => isAvailable && handlevailablity(availability)}
                                        className={`border border-gray-300 text-center ${
                                            isAvailable ? (isReserved ? 'bg-orange-200' : 'bg-green-200') : ''
                                        }`}
                                        >
                                        {isAvailable ? (isReserved ? 'Réservé' : 'Disponible') : ''}
                                    </div>
                                    ) :
                                    ( 
                                    <div
                                        key={index}
                                        onClick={() => !isReserved && addAvailability(availability, day)}
                                        className={`border border-gray-300 text-center ${
                                            isAvailable ? (isReserved ? 'bg-orange-200' : 'bg-green-200') : ''
                                        }`}>
                                        {
                                            isAvailable ? (isReserved ? 'Réservé' : 'Disponible') : ''
                                        }
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
