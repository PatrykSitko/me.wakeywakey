import React, { useRef, useEffect, useState } from "react";
import { playSound, sounds as sound } from "./soundPlayer";
import ReactDOM from "react-dom";
import "./soundList.css";

function checkList(list, setList) {
  if (typeof setList !== "function") {
    throw new TypeError(
      "Element::SoundList: is missing setList attribute, the setList attribute should be able to update the list that's passed as a child"
    );
  }
  return typeof list !== "object"
    ? setList([list]) || [list]
    : Object.values(list);
}
function useWindowDimensionsListener(setWindowDimensions) {
  const updateWindowDimensions = setWindowDimensions => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };
  useEffect(() => {
    window.addEventListener(
      "fullscreenchange",
      updateWindowDimensions.bind(this, setWindowDimensions)
    );
    window.addEventListener(
      "resize",
      updateWindowDimensions.bind(this, setWindowDimensions)
    );
  }, [setWindowDimensions]);
}

/**
 *
 * @param {float} value 0<->1
 */
function vmin(value) {
  value = value < 0 ? 0 : value > 1 ? 1 : value;
  return window.innerHeight <= window.innerWidth
    ? window.innerHeight * value
    : window.innerWidth * value;
}
// function vmax(value) {
//   value = value < 0 ? 0 : value > 1 ? 1 : value;
//   return window.innerHeight >= window.innerWidth
//     ? window.innerHeight * value
//     : window.innerWidth * value;
// }
function SoundList({
  selectedSoundEntryIndexArray,
  setSelectedSoundEntryIndexArray,
  setList,
  mute,
  children: list
}) {
  const soundList = checkList(list, setList);
  const ref = useRef();
  const [maxHeight, setMaxHeight] = useState(undefined);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  useWindowDimensionsListener(setWindowDimensions);
  useEffect(() => {
    const soundListContainerRect = ReactDOM.findDOMNode(
      ref.current
    ).getBoundingClientRect();
    if (
      maxHeight !==
      windowDimensions.height - soundListContainerRect.y - vmin(0.085)
    ) {
      setMaxHeight(
        windowDimensions.height - soundListContainerRect.y - vmin(0.085)
      );
    }
  }, [ref, windowDimensions, maxHeight, setMaxHeight]);
  return (
    <div className="sound-list-container" ref={ref}>
      <ul
        className="sound-list"
        style={{ maxHeight }}
        onMouseLeave={playSound.bind(this, sound.mouseEnterLeave, mute)}
      >
        {soundList.map((sound, index, sounds) => (
          <SoundListEntry
            key={index}
            {...{
              index,
              selectedSoundEntryIndexArray,
              setSelectedSoundEntryIndexArray,
              soundEntries: sounds,
              setSoundEntries: setList,
              mute
            }}
            soundImage={sound.image}
            soundName={sound.name.replace(".mp3", "")}
          />
        ))}
      </ul>
    </div>
  );
}

function useFileInputHandler(soundIndex, soundEntries, setSoundEntries) {
  const [fileException, setFileException] = useState(false);
  let inputElement = document.createElement("input");
  inputElement.setAttribute("type", "file");
  inputElement.setAttribute("accept", "image/*");
  inputElement.addEventListener("change", event => {
    if (event.target.files[0].type.includes("image")) {
      setFileException(false);
      const soundEntriesCopy = soundEntries;
      soundEntriesCopy[soundIndex].image = URL.createObjectURL(
        event.target.files[0]
      );
      setSoundEntries(soundEntriesCopy);
    } else {
      setFileException(true);
      setTimeout(() => setFileException(false), 2500);
    }
    inputElement.setAttribute("value", "");
  });
  return { inputElement, fileException };
}
function SoundImagePicker({ soundIndex, soundEntries, setSoundEntries, mute }) {
  const { inputElement, fileException } = useFileInputHandler(
    soundIndex,
    soundEntries,
    setSoundEntries
  );
  return (
    <div
      onMouseEnter={playSound.bind(this, sound.mouseEnterLeave, mute)}
      onMouseLeave={playSound.bind(this, sound.mouseEnterLeave, mute)}
      className={`image-picker${
        fileException ? " image-picker-exception" : ""
      }`}
      onClick={() =>
        !fileException && playSound(sound.confirm, mute) && inputElement.click()
      }
    >
      {fileException && ["WRONG", <br />, "FILE", <br />, "TYPE"]}
    </div>
  );
}
function SoundListEntry({
  index,
  selectedSoundEntryIndexArray,
  setSelectedSoundEntryIndexArray,
  soundEntries,
  setSoundEntries,
  mute
}) {
  return (
    <li
      onMouseEnter={playSound.bind(this, sound.mouseEnterLeave, mute)}
      onClick={() =>
        !selectedSoundEntryIndexArray.includes(index)
          ? playSound(sound.select, mute)
          : playSound(sound.deselect, mute)
      }
      className={`sound-list-entry${
        selectedSoundEntryIndexArray.includes(index)
          ? " sound-list-entry-selected"
          : ""
      }`}
    >
      {soundEntries[index].image ? (
        <img
          src={soundEntries[index].image}
          alt=""
          onClick={() =>
            selectedSoundEntryIndexArray.includes(index)
              ? setSelectedSoundEntryIndexArray(
                  selectedSoundEntryIndexArray.filter(entry => entry !== index)
                )
              : setSelectedSoundEntryIndexArray(
                  selectedSoundEntryIndexArray.concat(index)
                )
          }
        />
      ) : (
        <SoundImagePicker
          {...{
            soundIndex: index,
            soundEntries,
            setSoundEntries,
            mute
          }}
        />
      )}
      <p
        onClick={() =>
          selectedSoundEntryIndexArray.includes(index)
            ? setSelectedSoundEntryIndexArray(
                selectedSoundEntryIndexArray.filter(entry => entry !== index)
              )
            : setSelectedSoundEntryIndexArray(
                selectedSoundEntryIndexArray.concat(index)
              )
        }
      >
        {soundEntries[index].name}
      </p>
    </li>
  );
}
export default SoundList;
