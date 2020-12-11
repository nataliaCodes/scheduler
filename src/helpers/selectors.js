
export function getAppointmentsForDay(state, day) {
  
  // if (state.days.length === 0) {
  //   return [];
  // };
  // const filteredDay = state.days.filter(obj => obj.name === day);
  // if (filteredDay.length === 0) {
  //   return [];
  // };
  // const foundAppointments = filteredDay[0].appointments;
  //below solution is better because the find method returns the object directly

  //find object that contains the day with specific name
  const dayFound = state.days.find(obj => obj.name === day);

  if(!dayFound) {
    return []
  }

  //extract appointments array
  const foundAppointments = dayFound.appointments

  //return the needed object
  return foundAppointments.map(id => state.appointments[id]);

}

export function getInterview(state, interview) {

  const result = {};

  if (!interview){
    return null;
  }

  //get id of the interviewer
  const interviewerId = interview.interviewer;

  //build object we need to return
  result.student = interview.student;
  result.interviewer = state.interviewers[interviewerId];


  return result;
}