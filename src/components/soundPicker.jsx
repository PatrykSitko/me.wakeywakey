import React, { useState } from "react";
import { playSound, sounds as sound } from "./soundPlayer";
import "./soundPicker.css";

function useFileInputHandler(setSelectedSong, setFileException) {
  return new Promise(resolve => {
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
      inputElement = null;
    });
    resolve(inputElement);
  });
}
function SoundPicker({ setSelectedSong, mute }) {
  const [fileException, setFileException] = useState(false);
  const inputElementPromise = useFileInputHandler(
    setSelectedSong,
    setFileException
  );
  return (
    <div
      className={`sound-picker${
        fileException ? " sound-picker-file-exception" : ""
      }`}
      onMouseEnter={playSound.bind(this, sound.mouseEnterLeave, mute)}
      onMouseLeave={playSound.bind(this, sound.mouseEnterLeave, mute)}
      onClick={() =>
        !fileException &&
        playSound(sound.confirm, mute) &&
        inputElementPromise.then(inputElement => inputElement.click())
      }
    >
      {fileException ? 'ADD a wakey "SONG"' : "ADD a wakey song"}
    </div>
  );
}
export default SoundPicker;
