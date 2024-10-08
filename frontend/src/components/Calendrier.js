import React from 'react';

// Les jours de la semaine
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeeklyCalendar = ({ availabilities }) => {
  // Fonction pour formater l'heure dans un format plus lisible
  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Générer la structure du calendrier avec les jours de la semaine
  return (
    <div className="grid grid-cols-8 gap-4">
      <div className="col-span-1 text-center font-bold">Heures</div>
      {daysOfWeek.map((day, index) => (
        <div key={index} className="text-center font-bold">{day}</div>
      ))}

      {/* Afficher les heures entre 8h et minuit */}
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

              return (
                <div
                  key={index}
                  className={`border border-gray-300 text-center ${
                    isAvailable ? 'bg-green-200' : ''
                  }`}
                >
                  {isAvailable ? 'Disponible' : ''}
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default WeeklyCalendar;
