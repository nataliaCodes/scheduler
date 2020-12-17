
export function getAppointmentsForDay(state, day) {

  if (state.days.length === 0) {
    return [];
  };

  //find object that contains the day with specific name
  const dayFound = state.days.find(obj => obj.name === day);

  if (!dayFound) {
    return []
  };

  //extract appointments array
  const foundAppointments = dayFound.appointments;

  //return array of appointments objects
  return foundAppointments.map(id => state.appointments[id]);

}

export function getInterviewersForDay(state, day) {

  const dayFound = state.days.find(obj => obj.name === day);

  if (!dayFound) {
    return []
  };

  //extract interviewers array
  const foundInterviewers = dayFound.interviewers;

  //return array of interviewers objects
  return foundInterviewers.map(id => state.interviewers[id]);
}


export function getInterview(state, interview) {

  const result = {};

  if (!interview) {
    return null;
  };

  //get id of the interviewer
  const interviewerId = interview.interviewer;

  //build object we need to return
  result.student = interview.student;
  result.interviewer = state.interviewers[interviewerId];


  return result;
}