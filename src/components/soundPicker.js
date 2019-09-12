import React, { useState } from "react";
import {playSound,sounds as sound} from "../helpers/soundPlayer";
import "./soundPicker.css";

function useFileInputHandler(setSelectedSong, setFileException) {
  let inputElement = document.createElement("input");
  inputElement.setAttribute("type", "file");
  inputElement.setAttribute("accept", "audio/*");
  inputElement.addEventListener("change", event => {
    if (event.target.files[0].type.includes("audio")) {
      setFileException(false);
      setSelectedSong({
        src: URL.createObjectURL(event.target.files[0]),
        name: event.target.files[0].name,
        image: null
      });
    } else {
      setFileException(true);
      setTimeout(() => setFileException(false), 2500);
    }
    inputElement.setAttribute("value", "");
  });
  return inputElement;
}
function SoundPicker({ setSelectedSong,mute }) {
  const [fileException, setFileException] = useState(false);
  const inputElement = useFileInputHandler(setSelectedSong, setFileException);
  return (
    <div
      className={`sound-picker${
        fileException ? " sound-picker-file-exception" : ""
      }`}
      onMouseEnter={playSound.bind(this, sound.mouseEnterLeave, mute)}
      onMouseLeave={playSound.bind(this, sound.mouseEnterLeave, mute)}
      onClick={() => !fileException &&playSound(sound.confirm, mute)&& inputElement.click()}
    >
      {fileException ? 'ADD a wakey "SONG"' : "ADD a wakey song"}
    </div>
  );
}
export default SoundPicker;
