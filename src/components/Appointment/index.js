import React from 'react';
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "../../hooks/useVisualMode"

import "./styles.scss";

//variables needed for the visual mode hook
const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {

  //set the mode conditionally based on props.interview value
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* show the components conditionally based on the visual mode hook */}
      {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  )

}