
export function getAppointmentsForDay(state, day) {
  
  if (state.days.length === 0) {
    return [];
  };

  const filteredDay = state.days.filter(obj => obj.name === day);

  if (filteredDay.length === 0) {
    return [];
  };

  const appointments = filteredDay[0].appointments;

  return appointments.map(id => state.appointments[id]);

}