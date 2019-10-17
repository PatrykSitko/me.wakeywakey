import React, { useState, useEffect } from "react";
import { playSound, sounds as sound } from "./soundPlayer";
import "./ArmAlarm.css";

const ONE_DAY = 24 * 60 * 60;
const buttonActivatedClass = " arm-alarm-button-activated";
function ArmAlarm({
  clockState,
  setClockState,
  alarmArmed,
  setAlarmArmed,
  wakeupTime = { minutesLeft: 0, minutesRight: 0, hoursLeft: 0, hoursRight: 0 },
  selectedSoundEntryIndexArray,
  setWakeupTimeExternal,
  soundList,
  volume,
  mute
}) {
  const [snoozeTimeout, setSnoozeTimeout] = useState(false);
  const [trackedTimeout, setTrackedTimeout] = useState(false);
  const [trackedInterval, setTrackedInterval] = useState(false);
  const [allowedToPlaySongs, setAllowedToPlaySongs] = useState(false);
  const [playedSongsEntryIndexArray, setPlayedSongsEntryIndexArray] = useState(
    []
  );
  const [playerIsPlaying, setPlayerIsPlaying] = useState(false);
  const [snooze, setSnooze] = useState(false);
  const player = useState(document.createElement("audio"))[0];
  const { hoursLeft, hoursRight, minutesLeft, minutesRight } = wakeupTime;
  const hours = parseInt(`${hoursLeft}${hoursRight}`);
  const minutes = parseInt(`${minutesLeft}${minutesRight}`);
  useEffect(() => {
    if (alarmArmed && !trackedTimeout) {
      const timeoutTime = findTimeoutTime(hours, minutes);
      setTrackedTimeout(
        setTimeout(() => setAllowedToPlaySongs(true), timeoutTime)
      );
    } else if (!alarmArmed && trackedTimeout) {
      player.pause();
      setPlayerIsPlaying(false);
      setSnooze(false);
      setTrackedTimeout(clearTimeout(trackedTimeout));
    } else if (snooze) {
      player.pause();
      setPlayerIsPlaying(false);
      setSnooze(false);
      setAllowedToPlaySongs(false);
      setSnoozeTimeout(
        setTimeout(() => {
          if (alarmArmed) {
            setAllowedToPlaySongs(true);
          }
          clearTimeout(snoozeTimeout);
        }, 300000 - new Date().getSeconds() * 1000)
      );
      const newDate = new Date();
      newDate.setMinutes(new Date().getMinutes() + 5);
      const newHours =
        newDate.getHours().toString().length > 1
          ? newDate.getHours().toString()
          : "0".concat(newDate.getHours().toString());
      const newMinutes =
        newDate.getMinutes().toString().length > 1
          ? newDate.getMinutes().toString()
          : "0".concat(newDate.getMinutes().toString());
      setWakeupTimeExternal({
        hoursLeft: newHours.slice(0, 1),
        hoursRight: newHours.slice(1, 2),
        minutesLeft: newMinutes.slice(0, 1),
        minutesRight: newMinutes.slice(1, 2)
      });
    } else if (allowedToPlaySongs) {
      setClockState("on");
      playSongs(
        player,
        soundList,
        selectedSoundEntryIndexArray,
        playedSongsEntryIndexArray,
        setPlayedSongsEntryIndexArray,
        playerIsPlaying,
        setPlayerIsPlaying
      );
    } else if (!allowedToPlaySongs && playerIsPlaying) {
      player.pause();
      setPlayerIsPlaying(false);
    }
  }, [
    hours,
    minutes,
    alarmArmed,
    soundList,
    wakeupTime,
    setWakeupTimeExternal,
    trackedTimeout,
    setTrackedTimeout,
    player,
    snooze,
    selectedSoundEntryIndexArray,
    playedSongsEntryIndexArray,
    setPlayedSongsEntryIndexArray,
    playerIsPlaying,
    setPlayerIsPlaying,
    allowedToPlaySongs,
    setAllowedToPlaySongs,
    snoozeTimeout,
    setSnoozeTimeout,
    setClockState
  ]);
  useEffect(() => {
    if (!trackedInterval && alarmArmed) {
      setTrackedInterval(
        setInterval(() => {
          if (!alarmArmed || !allowedToPlaySongs) {
            return;
          }
          const newDate = new Date();
          const newHours =
            newDate.getHours().toString().length > 1
              ? newDate.getHours().toString()
              : "0".concat(newDate.getHours().toString());
          const newMinutes =
            newDate.getMinutes().toString().length > 1
              ? newDate.getMinutes().toString()
              : "0".concat(newDate.getMinutes().toString());
          if (
            newDate.getHours() !== hours ||
            newDate.getMinutes() !== minutes
          ) {
            setWakeupTimeExternal({
              hoursLeft: newHours.slice(0, 1),
              hoursRight: newHours.slice(1, 2),
              minutesLeft: newMinutes.slice(0, 1),
              minutesRight: newMinutes.slice(1, 2)
            });
          }
        }, 1)
      );
    }
    return () => {
      setTrackedInterval(clearInterval(trackedInterval));
    };
  }, [
    trackedInterval,
    setTrackedInterval,
    setWakeupTimeExternal,
    alarmArmed,
    hours,
    minutes,
    allowedToPlaySongs
  ]);
  return (
    <div className="arm-alarm-buttons-container">
      <div
        onClick={() =>
          (!alarmArmed &&
            playSound(sound._switch, mute, volume) &&
            setAlarmArmed(true)) ||
          (!clockState.includes("snooze") && setClockState("on"))
        }
        onMouseEnter={playSound.bind(this, sound.mouseEnterLeave, mute, volume)}
        onMouseLeave={playSound.bind(this, sound.mouseEnterLeave, mute, volume)}
        className={`arm-alarm-activate-button${
          alarmArmed ? buttonActivatedClass : ""
        }`}
      >
        ON
      </div>
      <div
        onClick={() =>
          (alarmArmed &&
            allowedToPlaySongs &&
            !snooze &&
            playSound(sound.snooze, mute, volume) &&
            setSnooze(true)) ||
          (allowedToPlaySongs && setClockState("snooze"))
        }
        onMouseEnter={playSound.bind(this, sound.mouseEnterLeave, mute, volume)}
        onMouseLeave={playSound.bind(this, sound.mouseEnterLeave, mute, volume)}
        className={`arm-alarm-snooze-button${
          alarmArmed && allowedToPlaySongs && !snooze
            ? ""
            : buttonActivatedClass
        }`}
      >
        SNOOZE
      </div>
      <div
        onMouseEnter={playSound.bind(this, sound.mouseEnterLeave, mute, volume)}
        onMouseLeave={playSound.bind(this, sound.mouseEnterLeave, mute, volume)}
        onClick={() =>
          (alarmArmed &&
            playSound(sound._switch, mute, volume) &&
            (setSnooze(false) ||
              setAlarmArmed(false) ||
              setAllowedToPlaySongs(false) ||
              setSnoozeTimeout(clearTimeout(snoozeTimeout)))) ||
          setClockState("off")
        }
        className={`arm-alarm-deactivate-button${
          !alarmArmed ? buttonActivatedClass : ""
        }`}
      >
        OFF
      </div>
    </div>
  );
}

function playSongs(
  player,
  soundList,
  selectedSoundEntryIndexArray,
  playedSongsEntryIndexArray,
  setPlayedSongsEntryIndexArray,
  playerIsPlaying,
  setPlayerIsPlaying,
  onlySelected = true
) {
  if (!playerIsPlaying) {
    setPlayerIsPlaying(true);
    new Promise(resolve => {
      let selectedSongsToPlay = soundList.filter((soundInfo, index) =>
        selectedSoundEntryIndexArray.includes(index)
      );
      let songsToPlay = undefined;
      if (selectedSongsToPlay.length <= 0) {
        songsToPlay = Object.values(soundList);
      } else {
        songsToPlay = selectedSongsToPlay.filter(
          index => !playedSongsEntryIndexArray.includes(index)
        );
        if (songsToPlay.length <= 0) {
          songsToPlay = selectedSongsToPlay;
        }
      }
      const songToPlay =
        songsToPlay[Math.round(Math.random() * (songsToPlay.length - 1))];
      setPlayedSongsEntryIndexArray(songsToPlay);
      player.setAttribute("src", songToPlay.src);
      player.addEventListener("ended", e => resolve(false));
      player.play();
    }).then(setPlayerIsPlaying);
  }
}

function findTimeoutTime(hours, minutes) {
  const seconds = findSeconds(hours, minutes);
  const date = new Date();
  const currentTimeSeconds = findSeconds(
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
  return (
    (seconds <= currentTimeSeconds
      ? ONE_DAY - currentTimeSeconds + seconds
      : seconds - currentTimeSeconds) * 1000
  );
}
function findSeconds(hours, minutes, seconds = 0) {
  return (hours * 60 + minutes) * 60 + seconds;
}

export default ArmAlarm;
