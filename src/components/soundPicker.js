import React, { useState } from "react";
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
      setTimeout(() => setFileException(false), 1500);
    }
    inputElement.setAttribute("value", "");
  });
  return inputElement;
}
function SoundPicker({ setSelectedSong }) {
  const [fileException, setFileException] = useState(false);
  const inputElement = useFileInputHandler(setSelectedSong, setFileException);
  return (
    <div
      className={`sound-picker${
        fileException ? " sound-picker-file-exception" : ""
      }`}
      onClick={() => !fileException && inputElement.click()}
    >
      {fileException ? 'ADD a wakey "SONG"' : "ADD a wakey song"}
    </div>
  );
}
export default SoundPicker;
