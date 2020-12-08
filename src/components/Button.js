import React from "react";
import "components/Button.scss";
var classNames = require('classnames');


export default function Button(props) {

  //managing the class without the classNames module
  // let buttonClass = "button";
  // //set button class conditionally - props are where we render the Button element (either storybook or the App.js)
  // if(props.confirm) {
  //   buttonClass += " button--confirm"
  // }

  // if(props.danger) {
  //   buttonClass += " button--danger"
  // }

  //with classNames module

  const buttonClass = classNames({
    //class will always be active
    "button": true,
    //will be active when confirm is passed as props
    "button--confirm": props.confirm,
    //will be active when danger is passed as props
    "button--danger": props.danger
  });

  //we pass the conditional class to the element to be rendered
  return (
  <button 
    className={buttonClass}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.children}
  </button>
  );
}
