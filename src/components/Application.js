import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";

const axios = require('axios');

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Jack Napier",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "1.30pm",
    interview: {
      student: "Bruce Wayne",
      interviewer: {
        id: 1,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "1pm",
    interview: {
      student: "Selina Kyle",
      interviewer: {
        id: 1,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "2pm",
    interview: {
      student: "Clark Kent",
      interviewer: {
        id: 1,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: "last",
    time: "5pm"
  }
];

export default function Application(props) {

  const [ day, setDay ] = useState("Monday");
  const [ days, setDays ] = useState([]);

  const handleOnClick = (day) => {
    console.log(day)
    setDay(day);
  }

  const scheduleList = appointments.map(appointment => <Appointment key={appointment.id} {...appointment}/>)

  useEffect(() => {
    axios.get('api/days')
      .then(response => {
        console.log(response.data);
        setDays(response.data);
      });
  }, [])

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
            days={days}
            day={day}
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
      </section>
    </main>
  );
}
