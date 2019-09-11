import React from "react";
import "./soundPicker.css";

function SoundPicker({ setSelectedSong }) {
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "file");
  inputElement.setAttribute("accept", "audio/*");
  inputElement.addEventListener("change", event => {
    if (event.target.files[0].type.includes("audio")) {
      setSelectedSong({
        src: URL.createObjectURL(event.target.files[0]),
        name: event.target.files[0].name,
        image: null
      });
    } else {
      alert("wrong file type");
    }
    inputElement.setAttribute("value", "");
  });
  return [
    <div className="sound-picker" onClick={() => inputElement.click()}>
      ADD a wakey song
    </div>
  ];
}

function notifyAboutFileFormatException({ children: format }) {
  return <div className="notify-about-file-format-exception"></div>;
}
export default SoundPicker;
