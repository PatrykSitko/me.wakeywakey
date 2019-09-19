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
import { vmin } from "./components/vscale.js";

function App() {
  const { localStorage: local } = window;
  const [soundList, setList] = useState(defaultSoundList);
  const [soundToAdd, setSoundToAdd] = useState(null);
  const [buttonsMuted, setButtonsMuted] = useState(
    local.getItem("buttonsMuted") !== null
      ? JSON.parse(local.getItem("buttonsMuted")).buttonsMuted
      : false
  );
  const [
    selectedSoundEntryIndexArray,
    setSelectedSoundEntryIndexArray
  ] = useState([]);
  const [volume, setVolume] = useState(
    local.getItem("volume") !== null
      ? JSON.parse(local.getItem("volume")).volume
      : 1
  );
  const [volumeSliderMarginTop, setVolumeSliderMarginTop] = useState(
    local.getItem("volumeSliderMarginTop") !== null
      ? JSON.parse(local.getItem("volumeSliderMarginTop")).volumeSliderMarginTop
      : 0 - vmin(0.5)
  );
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
  useEffect(() => {
    const storedVolumeSliderMarginTop = window.localStorage.getItem(
      "volumeSliderMarginTop"
    );
    if (storedVolumeSliderMarginTop === null) {
      window.localStorage.setItem(
        "volumeSliderMarginTop",
        JSON.stringify({ volumeSliderMarginTop })
      );
    } else {
      const parsedVolumeSliderMarginTop = JSON.parse(
        storedVolumeSliderMarginTop
      ).volumeSliderMarginTop;
      if (parsedVolumeSliderMarginTop !== volumeSliderMarginTop) {
        window.localStorage.setItem(
          "volumeSliderMarginTop",
          JSON.stringify({ volumeSliderMarginTop })
        );
      }
    }
    const storedVolume = window.localStorage.getItem("volume");
    if (storedVolume === null) {
      window.localStorage.setItem("volume", JSON.stringify({ volume }));
    } else {
      const parsedVolume = JSON.parse(storedVolume).volume;
      if (parsedVolume !== volume) {
        window.localStorage.setItem("volume", JSON.stringify({ volume }));
      }
    }
    const storedButtonsMuted = window.localStorage.getItem("buttonsMuted");
    if (storedButtonsMuted === null) {
      window.localStorage.setItem(
        "buttonsMuted",
        JSON.stringify({ buttonsMuted })
      );
    } else {
      const parsedButtonsMuted = JSON.parse(storedButtonsMuted).buttonsMuted;
      if (parsedButtonsMuted !== buttonsMuted) {
        window.localStorage.setItem(
          "buttonsMuted",
          JSON.stringify({ buttonsMuted })
        );
      }
    }
  }, [buttonsMuted, soundList, volume, volumeSliderMarginTop]);
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
          marginTop: volumeSliderMarginTop,
          setMarginTop: setVolumeSliderMarginTop,
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
