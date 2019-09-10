import React from "react";
import "./App.css";
import Clock from "./components/clock";
import Background from "./components/background";
import SoundPicker from "./components/soundPicker";
import dayVideo from "./day-background.webm";
import nightVideo from "./night-background.webm";

function App() {
  return (
    <div className="App">
      <Background day={dayVideo} night={nightVideo} />
      <Clock className="clock-position" />
      <SoundPicker />
    </div>
  );
}

export default App;
