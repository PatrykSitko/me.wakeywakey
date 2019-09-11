import React, { useState, useEffect } from "react";
import "./App.css";
import Clock from "./components/clock";
import Background from "./components/background";
import SoundPicker from "./components/soundPicker";
import SoundList from "./components/soundList";
import nightVideo from "./videos/night-background.webm";
import defaultSoundList from "./components/defaultSounds";

function App() {
  const [soundList, setList] = useState(defaultSoundList);
  const [soundToAdd, setSoundToAdd] = useState(null);
  useEffect(() => {
    if (soundToAdd) {
      setList([soundToAdd].concat(soundList));
      setSoundToAdd(null);
    }
  }, [soundToAdd, setSoundToAdd, soundList, setList]);
  return (
    <div className="App">
      <Background night={nightVideo} />
      <Clock className="clock-position" />
      <SoundPicker setSelectedSong={setSoundToAdd} />
      <SoundList {...{ setList }}>{soundList}</SoundList>
    </div>
  );
}

export default App;
