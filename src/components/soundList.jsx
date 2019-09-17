import React, { useRef, useEffect, useState } from "react";
import { vmin } from "./vscale";
import { playSound, sounds as sound } from "./soundPlayer";
import AuthorNotice from "./AuthorNotice";
import ReactDOM from "react-dom";
import "./soundList.css";

function SoundList({
  selectedSoundEntryIndexArray,
  setSelectedSoundEntryIndexArray,
  setList,
  mute,
  volume,
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
      windowDimensions.height - soundListContainerRect.y - vmin(8.5)
    ) {
      setMaxHeight(
        windowDimensions.height - soundListContainerRect.y - vmin(8.5)
      );
    }
  }, [ref, windowDimensions, maxHeight, setMaxHeight]);
  return (
    <div className="sound-list-container" ref={ref}>
      <ul
        className="sound-list"
        style={{ maxHeight }}
        onMouseLeave={playSound.bind(this, sound.mouseEnterLeave, mute, volume)}
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
              mute,
              volume
            }}
            soundImage={sound.image}
            soundName={sound.name.replace(".mp3", "")}
          />
        ))}
      </ul>
      <AuthorNotice {...{ volume, mute }} />
    </div>
  );
}

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

function useFileInputHandler(soundIndex, soundEntries, setSoundEntries) {
  const [fileException, setFileException] = useState(false);
  let inputElementPromise = new Promise(resolve => {
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
      inputElement = null;
    });
    resolve(inputElement);
  });
  return { inputElementPromise, fileException };
}
function SoundImagePicker({
  soundIndex,
  soundEntries,
  setSoundEntries,
  mute,
  volume
}) {
  const { inputElementPromise, fileException } = useFileInputHandler(
    soundIndex,
    soundEntries,
    setSoundEntries
  );
  return (
    <div
      onMouseEnter={playSound.bind(this, sound.mouseEnterLeave, mute, volume)}
      onMouseLeave={playSound.bind(this, sound.mouseEnterLeave, mute, volume)}
      className={`image-picker${
        fileException ? " image-picker-exception" : ""
      }`}
      onClick={() =>
        !fileException &&
        playSound(sound.confirm, mute, volume) &&
        inputElementPromise.then(inputElement => inputElement.click())
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
  mute,
  volume
}) {
  const playSoundAndSetSelected = () => {
    !selectedSoundEntryIndexArray.includes(index)
      ? playSound(sound.select, mute, volume)
      : playSound(sound.deselect, mute, volume);
    selectedSoundEntryIndexArray.includes(index)
      ? setSelectedSoundEntryIndexArray(
          selectedSoundEntryIndexArray.filter(entry => entry !== index)
        )
      : setSelectedSoundEntryIndexArray(
          selectedSoundEntryIndexArray.concat(index)
        );
  };
  return (
    <li
      onMouseEnter={playSound.bind(this, sound.mouseEnterLeave, mute, volume)}
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
          onClick={() => playSoundAndSetSelected()}
        />
      ) : (
        <SoundImagePicker
          {...{
            soundIndex: index,
            soundEntries,
            setSoundEntries,
            mute,
            volume
          }}
        />
      )}
      <p onClick={() => playSoundAndSetSelected()}>
        {soundEntries[index].name}
      </p>
    </li>
  );
}
export default SoundList;
