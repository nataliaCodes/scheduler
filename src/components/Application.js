import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";

const axios = require('axios');

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Jack Napier",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "1.30pm",
//     interview: {
//       student: "Bruce Wayne",
//       interviewer: {
//         id: 1,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "1pm",
//     interview: {
//       student: "Selina Kyle",
//       interviewer: {
//         id: 1,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "2pm",
//     interview: {
//       student: "Clark Kent",
//       interviewer: {
//         id: 1,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   }
// ];

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
    }
  });

  const dailyAppointments = [];

  const setDay = day => setState({ ...state, day });

  const handleOnClick = (day) => setDay(day);

  const scheduleList = dailyAppointments.map(appointment => <Appointment key={appointment.id} {...appointment} />)

  // const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {

    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments')
    ]).then(all => {
      console.log('days:', all[0].data, 'appts:', all[1].data)
      setState(prev => ({...prev, setDays: all[0].data, setAppointmens: all[1].data}))
    
    })

  }, []);

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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
