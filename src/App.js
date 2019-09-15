import React, { useState, useEffect } from "react";
import "./App.css";
import Clock from "./components/clock";
import Background from "./components/background";
import SoundPicker from "./components/soundPicker";
import SoundList from "./components/soundList";
import defaultSoundList from "./components/defaultSounds";
import NotFinishedNotice from "./components/notFinishedNotice";
import nightVideo from "./videos/night-background.webm";

function App() {
  const [soundList, setList] = useState(defaultSoundList);
  const [soundToAdd, setSoundToAdd] = useState(null);
  const [buttonsMuted, setButtonsMuted] = useState(false);
  const [
    selectedSoundEntryIndexArray,
    setSelectedSoundEntryIndexArray
  ] = useState([]);
  const [volume, setVolume] = useState(1);
  useEffect(() => {
    if (soundToAdd) {
      setList([soundToAdd].concat(soundList));
      setSoundToAdd(null);
    }
  }, [soundToAdd, setSoundToAdd, soundList, setList]);
  return (
    <div className="App">
      <Background night={nightVideo} />
      <NotFinishedNotice />
      <Clock
        className="clock-position"
        {...{ buttonsMuted, setButtonsMuted, volume, setVolume }}
      />
      <SoundPicker
        setSelectedSong={setSoundToAdd}
        mute={buttonsMuted}
        volume={volume}
      />
      <SoundList
        {...{
          setList,
          selectedSoundEntryIndexArray,
          setSelectedSoundEntryIndexArray,
          mute: buttonsMuted,
          volume
        }}
      >
        {soundList}
      </SoundList>
    </div>
  );
}

export default App;
