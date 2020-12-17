import React from "react";

import "components/Button.scss";

var classNames = require('classnames');


export default function Button(props) {

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
