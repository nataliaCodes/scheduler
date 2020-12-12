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

  const getSpotsForDay = () => {
    if (state.days) {
      const dayFound = state.days.find(obj => obj.name === state.day);
      const dayId = dayFound.id;
      // const name = dayFound.name;
      const currentSpots = dayFound.spots;
      console.log('currentSpots :', currentSpots);
      console.log('dayFound :', dayFound);
      return { dayId, currentSpots };
    }
  }

  //to save a new interview
  //passed to the appointment component as props
  const bookInterview = (id, interview, spotsChange) => {

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

    if (spotsChange) {
      const { dayId, currentSpots } = getSpotsForDay();
      const spots = currentSpots - 1;
      console.log('spots :', spots);
    }


    return new Promise((resolve, reject) => {
      axios.put(`/api/appointments/${id}`, { interview })
        .then(function (response) {
          setState({ ...state, appointments })
          resolve();
        })
        .catch(function (error) {
          console.log(error);
          reject();
        })
        .finally(console.log('Put request done'))
    });
    // return Promise.all([
    //   axios.put(`/api/appointments/${id}`, { interview }),
    //   axios.put(`/api/days/${dayId}`, { spots })
    // ]).then(all => console.log(all))
    //   .catch(error => console.log(error))
    //   .finally(console.log('Put requests done'))

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

    const { dayId, currentSpots } = getSpotsForDay();
    const spots = currentSpots + 1;
    console.log('spots :', spots);
    console.log('state spots :', state.days[dayId]);

    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointments/${id}`)
        .then(function (response) {
          setState({ ...state, appointments })
          resolve();
        })
        .catch(function (error) {
          console.log(error);
          reject();
        })
        .finally(console.log('Put request done'))
    });

  }

  return { state, setDay, bookInterview, cancelInterview }
}