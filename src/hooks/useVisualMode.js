import { useState } from 'react';
export default function useVisualMode(initial) {
    const [history, setHistory] = useState([initial]);
    function transition(mode, replace = false) {
      setHistory(prev =>
        replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]
        // If replace, we replace the last element of the array with mode 
        // Otherwise append mode to prev
      );
    }
    function back() {
      if (history.length < 2) return;
    //Remove the last element in the array and return the array
      setHistory(prev => [...prev.slice(0, history.length - 1)]);
    }
    return { mode: history[history.length - 1], transition, back };
}

// import { useState } from 'react';

// export default function useVisualMode(initialMode) {
//   const [mode, setMode ] = useState(initialMode);
//   const [history, setHistory] = useState([initialMode]);

//   function transition(newMode, replace = false) {
    
//     //set mode to new value
//     setMode(newMode)

//     //add new value to history array
//     setHistory(prev => ([...history, newMode]))

//     //if replace is true, slice the last value and add the new value instead of it
//     //slice returns an array => extract the value before placing it into new history array
//     if(replace) {
//       setHistory(prev => ([history.slice(0, history.length -1)[0], newMode]))
//     }
    
//   }

//   function back() {

//     if(history.length > 1) {

//       //no need to spread history because slice already creates a copy
//       setHistory(prev => (history.slice(0, history.length -1)))
  
//       //setMode and setHistory are working with the same initial array
//       //setMode will not work with the array modified above because they happen at the same time
//       setMode(history[history.length-2])

//     } 

//   }

//   //these get extracted in Appointment - index.js
//   // return { mode, transition, back }
//   return { mode: history[history.length - 1], transition, back };
// }