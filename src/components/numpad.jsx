import React, { useEffect } from "react";
import "./numpad.css";

const VARIABLE = 0;

function Numpad({ useTriggerInputFieldState, useNumberState, ...other }) {
  const [number, setNumber] = useNumberState;
  const triggerEvent = useTriggerInputFieldState[VARIABLE];
  useEffect(() => {
    if (!triggerEvent && typeof number === "number") {
      setNumber(undefined);
    }
  }, [number, setNumber, triggerEvent]);
  return (
    <div className="numpad" {...other} hidden={!triggerEvent}>
      <div className="number" onClick={() => setNumber(1)}>
        1
      </div>
      <div className="number" onClick={() => setNumber(2)}>
        2
      </div>
      <div className="number" onClick={() => setNumber(3)}>
        3
      </div>
      <div className="number" onClick={() => setNumber(4)}>
        4
      </div>
      <div className="number" onClick={() => setNumber(5)}>
        5
      </div>
      <div className="number" onClick={() => setNumber(6)}>
        6
      </div>
      <div className="number" onClick={() => setNumber(7)}>
        7
      </div>
      <div className="number" onClick={() => setNumber(8)}>
        8
      </div>
      <div className="number" onClick={() => setNumber(9)}>
        9
      </div>
      <div className="number" onClick={() => setNumber(0)}>
        0
      </div>
    </div>
  );
}

export default Numpad;
