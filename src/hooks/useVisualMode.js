import { useState } from 'react';
export default function useVisualMode(initial) {

    const [mode, setMode ] = useState(initial);
    const [history, setHistory] = useState([initial]);

    function transition(mode, replace = false) {

      //set mode to new value
      setMode(mode)

      setHistory(prev =>
        replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]
        // If replace, we replace the last element of the array with mode 
        // Otherwise append mode to prev
      );
    }

    function back() {
      
      if (history.length > 1) {
        setMode(history[history.length - 2]);
        setHistory((prev) => [...prev].slice(0, history.length - 1));
      }
      // if (history.length < 2) return;
    }
    
    return { mode, transition, back }
}