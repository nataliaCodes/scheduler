import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors"

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

  //handle the day selection
  const setDay = day => setState({ ...state, day });
  const handleOnClick = (day) => setDay(day);
  
  //extract appointments according to day displayed
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const scheduleList = dailyAppointments.map(appointment => {

    //getInterview -> selectors
    const interview = getInterview(state, appointment.interview)

    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
        interview={interview}
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
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    
    })

  }, []); //<-- executes only one because dependency array is empty

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
