import React from 'react';
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import useVisualMode from "../../hooks/useVisualMode"

import "./styles.scss";

//variables needed for the visual mode hook
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  //set the initial mode conditionally based on props.interview value
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //passed to the form component as props
  function save(name, interviewer) {
    
    //creates the object needed by the form
    const interview = {
      student: name,
      interviewer
    };

    //calls function from Application.js
    props.bookInterview(props.id, interview);

    //transition to SHOW so that the appointment stays on the page
    transition(SHOW);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* show the components conditionally based on the visual mode hook */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
    </article>
  )

}