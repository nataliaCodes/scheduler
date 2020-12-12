import { useState, useEffect } from "react";
const axios = require('axios');

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      "1": { id: 1, time: "12pm", interview: null },
      "2": { id: 2, time: "1pm", interview: null },
      "3": {
        id: 3,
        time: "2pm",
        interview: { student: "Archie Cohen", interviewer: 2 }
      },
      "4": { id: 4, time: "3pm", interview: null },
      "5": {
        id: 5,
        time: "4pm",
        interview: { student: "Chad Takahashi", interviewer: 2 }
      }
    },
    interviewers: {}
  });

  //get initial state values
  useEffect(() => {

    //promise all to get all results at the same time
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')

      //work with all results at the same time
    ]).then(all => {

      //spread the state object then assign the returned axios values to the specific keys
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))

    })

  }, []); //<-- executes only once because dependency array is empty

  //handle the day selection
  const setDay = day => setState({ ...state, day });

  const getSpotsRemaining = () => {
    if (state.days) {
      console.log('state.days :', state.days);
      const dayFound = state.days.find(obj => obj.name === state.day);
      console.log('dayFound :', dayFound);
      // return dayFound.spots;
    }
  }

  console.log('getSpotsRemaining :', getSpotsRemaining());
  // const spotsRemaining= dayFound.spots;

  // console.log('dayFound appts :', dayFound.appointments);
  // const dayAppointments = dayFound.appointments.map(id => state.appointments[id])
  // console.log('dayAppointments :', dayAppointments);

  // const filledSpots = dayAppointments.filter(appointment => appointment.interview !== null)
  // console.log('filledSpots :', filledSpots);

  //to save a new interview
  //passed to the appointment component as props
  const bookInterview = (id, interview) => {

    //updates the specific state appointment
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    //updates state appointments
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //async => need to return
    return axios
      .put(`/api/appointments/${id}`, { interview }) //<-- make sure to wrap the data transmitted in an object!
      .then(() => {
        //updates state with the new appointment
        setState({ ...state, appointments })
      })
      .catch(error => console.log(error))
      .finally(console.log('Put request done'))

  }

  //handle deletion of interview
  //passed as props to appointment component
  const cancelInterview = (id) => {

    //updates interview of specific appointment to null
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //async => need to return
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments });
      })
      .catch(error => console.log(error))
      .finally(console.log('Delete request done'))

  }

  return { state, setDay, bookInterview, cancelInterview }
}