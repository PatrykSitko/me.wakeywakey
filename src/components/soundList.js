import React, { useRef, useEffect, useState } from "react";
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
  }, []);
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
  selectedSoundEntryIndex,
  setSelectedSoundEntryIndex,
  setList,
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
    console.log(
      "max height:",
      windowDimensions.height - soundListContainerRect.y
    );
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
      <ul className="sound-list" style={{ maxHeight }}>
        {soundList.map((sound, index) => (
          <SoundListEntry
            {...{ index, selectedSoundEntryIndex, setSelectedSoundEntryIndex }}
            key={index}
            soundImage={sound.image}
            soundName={sound.name.replace(".mp3", "")}
          />
        ))}
      </ul>
    </div>
  );
}

function SoundImagePicker() {
  return <div className="image-picker"></div>;
}
function SoundListEntry({
  index,
  selectedSoundEntryIndex,
  setSelectedSoundEntryIndex,
  soundImage,
  soundName
}) {
  return (
    <li
      className={`sound-list-entry${
        selectedSoundEntryIndex === index ? " sound-list-entry-selected" : ""
      }`}
    >
      {soundImage ? (
        <img
          src={soundImage}
          alt=""
          onClick={() =>
            selectedSoundEntryIndex === index
              ? setSelectedSoundEntryIndex(null)
              : setSelectedSoundEntryIndex(index)
          }
        />
      ) : (
        <SoundImagePicker />
      )}
      <p
        onClick={() =>
          selectedSoundEntryIndex === index
            ? setSelectedSoundEntryIndex(null)
            : setSelectedSoundEntryIndex(index)
        }
      >
        {soundName}
      </p>
    </li>
  );
}
export default SoundList;
