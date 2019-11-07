import React, { useState, useEffect } from "react";
import "./App.css";
import Clock from "./components/clock";
import Background from "./components/background";
import SoundPicker from "./components/soundPicker";
import SoundList from "./components/soundList";
import defaultSoundList from "./components/defaultSounds";
import RightClickMenu from "./components/rightClickMenu";
import RightClickMenuEntry from "./components/rightClickMenuEntry";
// import NotFinishedNotice from "./components/notFinishedNotice";
import CookiesNotice from "./components/cookiesNotice";
import ArmAlarm from "./components/armAlarm";
import WakeyWakeyLogo from "./components/wakeyWakeyLogo";
import nightVideo from "./videos/universe.webm";
import { vmin } from "./components/vscale.js";
import Numpad from "./components/numpad";

const COOKIES_DECLINED = null;

function determineInitialValue(storedName, returnIfNull) {
  const { localStorage: local } = window;
  return local.getItem(storedName) !== null
    ? JSON.parse(local.getItem(storedName))[storedName]
    : returnIfNull;
}
function App() {
  const [number, setNumber] = useState(undefined);
  const [triggerNumpadEvent, setTriggerNumpadEvent] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(
    determineInitialValue("cookiesAccepted", false)
  );
  const [soundList, setList] = useState(defaultSoundList);
  const [soundToAdd, setSoundToAdd] = useState(null);
  const [buttonsMuted, setButtonsMuted] = useState(
    determineInitialValue("buttonsMuted", false)
  );
  const [
    selectedSoundEntryIndexArray,
    setSelectedSoundEntryIndexArray
  ] = useState([]);
  const [volume, setVolume] = useState(determineInitialValue("volume", 1));
  const [volumeSliderMarginTop, setVolumeSliderMarginTop] = useState(
    determineInitialValue("volumeSliderMarginTop", 0 - vmin(0.5))
  );
  const [wakeupTime, setWakeupTime] = useState(undefined);
  const [wakeupTimeExternal, setWakeupTimeExternal] = useState(undefined);
  const [alarmArmed, setAlarmArmed] = useState(false);
  const [clockState, setClockState] = useState("off");
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
    const storedCookiesAccepted = window.localStorage.getItem(
      "cookiesAccepted"
    );
    if (storedCookiesAccepted === null && cookiesAccepted) {
      window.localStorage.setItem(
        "cookiesAccepted",
        JSON.stringify({ cookiesAccepted })
      );
    }
    if (!cookiesAccepted || cookiesAccepted === COOKIES_DECLINED) {
      return;
    }
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
  }, [
    buttonsMuted,
    soundList,
    volume,
    volumeSliderMarginTop,
    cookiesAccepted,
    setCookiesAccepted
  ]);
  return (
    <div className="App">
      <Numpad
        useTriggerInputFieldState={[triggerNumpadEvent, setTriggerNumpadEvent]}
        useNumberState={[number, setNumber]}
      />
      <RightClickMenu>
        <RightClickMenuEntry
          key="share-on-facebook"
          action={() =>
            window.open(
              "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.wakeywakey.me%2F&amp;src=sdkpreparse",
              "_blank",
              {},
              false
            )
          }
        >
          Share on Facebook
        </RightClickMenuEntry>
      </RightClickMenu>
      <Background night={nightVideo} />
      {/* <NotFinishedNotice /> */}
      <CookiesNotice
        {...{ cookiesAccepted, setCookiesAccepted, mute: buttonsMuted, volume }}
      />
      :
      <WakeyWakeyLogo />
      <ArmAlarm
        {...{
          clockState,
          setClockState,
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
          useNumpadState: [number, setNumber],
          useTriggerInputFieldState: [
            triggerNumpadEvent,
            setTriggerNumpadEvent
          ],
          state: clockState,
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
          useNumpadState: [number, setNumber],
          clockState,
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
