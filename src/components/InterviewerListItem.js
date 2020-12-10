import React from "react";
import "components/InterviewerListItem.scss";
var classNames = require('classnames');

export default function InterviewerListItem(props) {

  const { name, avatar, selected} = props

  const interviewersClass = classNames("interviewers__item", {
    //the value needs to be true for the class to be applied
    "interviewers__item--selected": selected
  });

  return (

    <li
      className={interviewersClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected ? name : ""}
    </li>
  )
}