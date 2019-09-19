import React, { useState, useEffect } from "react";
import "./App.css";
import Clock from "./components/clock";
import Background from "./components/background";
import SoundPicker from "./components/soundPicker";
import SoundList from "./components/soundList";
import defaultSoundList from "./components/defaultSounds";
import NotFinishedNotice from "./components/notFinishedNotice";
import ArmAlarm from "./components/armAlarm";
import WakeyWakeyLogo from "./components/wakeyWakeyLogo";
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
  const [wakeupTime, setWakeupTime] = useState(undefined);
  const [wakeupTimeExternal, setWakeupTimeExternal] = useState(undefined);
  const [alarmArmed, setAlarmArmed] = useState(false);
  useEffect(() => {
    if (soundToAdd) {
      setSelectedSoundEntryIndexArray(
        selectedSoundEntryIndexArray.map(entryIndex => entryIndex + 1)
      );
      setList([soundToAdd].concat(soundList));
      setSoundToAdd(null);
    }
  }, [
    soundToAdd,
    setSoundToAdd,
    soundList,
    setList,
    selectedSoundEntryIndexArray,
    setSelectedSoundEntryIndexArray
  ]);
  return (
    <div className="App">
      <Background night={nightVideo} />
      <NotFinishedNotice />
      <WakeyWakeyLogo />
      <ArmAlarm
        {...{
          wakeupTime,
          setWakeupTime,
          soundList,
          alarmArmed,
          setAlarmArmed,
          mute: buttonsMuted,
          selectedSoundEntryIndexArray,
          setWakeupTimeExternal,
          volume
        }}
      />
      <Clock
        {...{
          wakeupTimeExternal,
          setWakeupTimeExternal,
          buttonsMuted,
          setButtonsMuted,
          volume,
          setVolume,
          setWakeupTime,
          hideUI: alarmArmed
        }}
      />
      <SoundPicker
        setSelectedSong={setSoundToAdd}
        mute={buttonsMuted}
        volume={volume}
        {...{
          selectedSoundEntryIndexArray,
          setSelectedSoundEntryIndexArray
        }}
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
