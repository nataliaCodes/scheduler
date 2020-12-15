import React, { useState } from 'react';
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const handleInput = event => {
    event.preventDefault();
    setName(event.target.value);
  }

  const handleInterviewer = interviewer => {
    setInterviewer(interviewer)
  }

  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  const cancel = () => {
    props.onCancel()
  }

  const handleCancel = () => {
    reset()
    cancel()
  }

  const handleSave = () => {

      if (name === "") {
        setError("Student name cannot be blank");
        return;
      }

    //comes from appointment component
    props.onSave(name, interviewer)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            onChange={handleInput}
            value={name}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            data-testid= "student-name-input"
          /*
            This must be a controlled component
          */
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer} 
          setInterviewer={handleInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={handleCancel} danger>Cancel</Button>
          <Button onClick={handleSave} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}