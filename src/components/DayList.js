import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const { days, setDay } = props

  const daysList = days ? days.map(day => {
    /* {the name, spots are being passed as props in index.js} */
    return <DayListItem key={day.id} name={day.name} spots={day.spots} selected={day.name === props.day} setDay={() => setDay(day.name)} />
  }) : "There is no data here"

  return <ul>
    { daysList }
  </ul>
}