import React from 'react';
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import useVisualMode from "../../hooks/useVisualMode"

import "./styles.scss";

//variables needed for the visual mode hook
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

export default function Appointment(props) {

  //set the initial mode conditionally based on props.interview value
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //passed to the form component as props
  const save = (name, interviewer) => {
    
    //creates the object needed by the form
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    //calls function from Application.js
    props.bookInterview(props.id, interview)
      //.then is needed because bookInterview makes an async axios call
      //transition to SHOW so that the appointment stays on the page
      .then(() => transition(SHOW))

  }

  //passed to show view as props
  const deleteInterview = () => {

    transition(DELETING)

    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
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
          onDelete={deleteInterview}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
      {mode === SAVING && <Status message="Saving..."/>}
      {mode === DELETING && <Status message="Deleting..."/>}
    </article>
  )

}