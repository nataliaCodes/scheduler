import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const { days, setDay } = props

  //use ternary to cover situation when "days" comes back undefined
  const daysList = days ? days.map(day => {

    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={() => setDay(day.name)}
      />
    )
  }) : "There is no data here"

  return <ul>
    {daysList}
  </ul>
}