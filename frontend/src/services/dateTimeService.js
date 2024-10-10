const dateTimeService = (day, startTime, endTime) => {
    const currentDate = new Date();

    // Les jours de la semaine en anglais
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Trouver l'indice du jour passé en paramètre
    const dayIndex = daysOfWeek.indexOf(day);
    if (dayIndex === -1) {
        throw new Error("Jour invalide. Utilisez un jour valide (Monday, Tuesday, etc.).");
    }

    // Trouver l'indice du jour de la semaine actuelle (0 pour dimanche, 6 pour samedi)
    const currentDayIndex = currentDate.getDay();

    // Calculer combien de jours de différence entre aujourd'hui et le jour cible
    const dayDifference = dayIndex - currentDayIndex;

    // Calculer la date du jour cible
    const targetDate = new Date();
    targetDate.setDate(currentDate.getDate() + dayDifference);

    // Extraire les heures et les minutes
    const [startHours, startMinutes] = startTime.split(':');
    const [endHours, endMinutes] = endTime.split(':');

    // Vérifier si les heures sont entre 8h et 23h
    if (startHours < 8 || startHours > 23 || endHours < 8 || endHours > 23) {
        throw new Error("Les heures doivent être comprises entre 8h et 23h.");
    }

    // Vérifier si l'heure de début est inférieure à l'heure de fin
    if (startHours > endHours || (startHours === endHours && startMinutes >= endMinutes)) {
        throw new Error("L'heure de début doit être inférieure à l'heure de fin.");
    }

    // Mettre à jour l'heure pour la date de début en ajoutant 2 heures
    const startDate = new Date(targetDate);
    startDate.setHours(Number(startHours) + 2, startMinutes, 0, 0);

    // Mettre à jour l'heure pour la date de fin en ajoutant 2 heures
    const endDate = new Date(targetDate);
    endDate.setHours(Number(endHours) + 2, endMinutes, 0, 0);

    // Fonction pour formater la date avec le fuseau horaire
    const formatWithTimezone = (date) => {
        const tzOffset = -date.getTimezoneOffset(); 
        const diff = tzOffset >= 0 ? '+' : '-';
        const pad = (num) => String(Math.floor(Math.abs(num))).padStart(2, '0');

        return `${date.toISOString().split('.')[0]}${diff}${pad(tzOffset / 60)}:${pad(tzOffset % 60)}`;
    };

    const formattedStart = formatWithTimezone(startDate);
    const formattedEnd = formatWithTimezone(endDate);

    return { start: formattedStart, end: formattedEnd };
}

export default dateTimeService;
