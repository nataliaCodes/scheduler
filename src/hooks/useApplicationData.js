import { useState, useEffect } from "react";
import axios from 'axios';

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

  //extracts number of available spots for selected day
  const getSpotsForDay = (day, days, appointments) => {

    //finds the currently selected day
    const daySelected = days.find(obj => obj.name === day);

    //gets the appointment objects for the day
    const dayAppointments = daySelected.appointments.map(id => appointments[id]);

    //calculated number of remaining spots based on the appointments that have the interview set to null
    return dayAppointments.filter(appointment => appointment.interview === null).length;
  }

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

    //get number of spots for specific day
    const spots = getSpotsForDay(state.day, state.days, appointments);

    //update the specific day's number of spots
    //value gets set into state within the axios call below
    const days = state.days.map(day => {
      if(day.name === state.day) {
        return {...day, spots}
      }

      return day;
    })

    return new Promise((resolve, reject) => {
      axios.put(`/api/appointments/${id}`, { interview })
        .then(function (response) {
          setState({ ...state, appointments, days })
          resolve();
        })
        .catch(function (error) {
          reject();
        })
    });

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

    const spots = getSpotsForDay(state.day, state.days, appointments);

    const days = state.days.map(day => {
      if(day.name === state.day) {
        return {...day, spots}
      }

      return day;
    })

    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointments/${id}`)
        .then(function (response) {
          setState({ ...state, appointments, days })
          resolve();
        })
        .catch(function (error) {
          reject();
        })
    });

  }

  return { state, setDay, bookInterview, cancelInterview }
}