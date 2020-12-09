import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from 'components/InterviewerListItem'

export default function InterviewerList(props) {

  console.log('props of list.js', props.interviewers)

  const interviewersList = props.interviewers.map(interviewer => {
    
    console.log('inside map', interviewer)
    
    return (

    <InterviewerListItem 
      key={interviewer.id} 
      id={interviewer.id}
      name={interviewer.name} 
      avatar={interviewer.avatar} 
      setInterviewer={() => props.setInterviewer(interviewer.id)} 
      selected={props.interviewer === interviewer.id}
    />
    )
  })

  return (
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
          { interviewersList }
        </ul>
      </section>
  )
}