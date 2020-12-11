import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors"

const axios = require('axios');

export default function Application(props) {

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
        setState({ ...state, appointments });
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
      .finally(console.log('Put request done'))

  }

  //handle the day selection
  const setDay = day => setState({ ...state, day });
  const handleOnClick = (day) => setDay(day);

  //extract appointments according to day displayed
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  //extract appointment details to display
  const scheduleList = dailyAppointments.map(appointment => {

    //getInterview, getInterviewers -> selectors - passed as props to appointment component
    const interview = getInterview(state, appointment.interview)
    const interviewers = getInterviewersForDay(state, state.day)

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })

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

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={handleOnClick}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {scheduleList}

        {/* display the last divider on the page */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
