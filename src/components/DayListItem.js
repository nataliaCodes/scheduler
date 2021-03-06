import React from "react";

import "components/DayListItem.scss";

var classNames = require('classnames');

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = number => {

    let output = `${number} spots remaining`

    if (number === 0) {
      output = "no spots remaining"
    }

    if (number === 1) {
      output = "1 spot remaining"
    }

    return output;
  };

  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={() => { props.setDay(props.name) }}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}