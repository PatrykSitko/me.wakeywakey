import React, { useState, useEffect, useRef } from "react";
import { vmin } from "./vscale.js";
import ReactDOM from "react-dom";
import "./volumeController.css";

function VolumeController({
  muted,
  setMuted,
  volume,
  setVolume,
  className,
  marginTop,
  setMarginTop,
  ...props
}) {
  const [mousedown, setMousedown] = useState(undefined);
  const [mousemove, setMousemove] = useState(undefined);
  const containerRef = useRef();
  const nobRef = useRef();
  useEventListeners(mousedown, setMousedown, setMousemove);
  useSliderMovementHandler(
    containerRef,
    mousedown,
    mousemove,
    marginTop,
    setMarginTop
  );
  useEffect(() => {
    const nobSize = findNobSize(nobRef.current);
    const oneSector = findOneSector(containerRef.current, nobSize);
    const sectors = findSectors(oneSector);
    const currentSector = findSector(sectors, marginTop, nobSize);
    const volume = findVolume(currentSector);
    setVolume(volume);
  }, [
    nobRef,
    containerRef,
    volume,
    setVolume,
    mousedown,
    mousemove,
    marginTop
  ]);
  return [
    <div
      {...{
        ref: containerRef,
        key: "volume-controller-container",
        className: `volume-controller-container${
          className ? " " + className : ""
        }`,
        ...props
      }}
      onMouseDown={({ pageX: x, pageY: y }) => setMousedown({ x, y })}
    >
      <div
        ref={nobRef}
        className="volume-controller-nob"
        style={{ marginTop }}
      />
      <div className="volume-controller-volume-indicator" />
    </div>
  ];
}

function findVolume(currentSector) {
  let volume = `${currentSector / 100}`;
  const dotIndex = volume.indexOf(".");
  volume = volume.slice(0, dotIndex + 2);
  volume = parseFloat(volume);
  return volume > 1 ? 1 : volume < 0 ? 0 : volume;
}

function findNobSize(currentNobRef) {
  const { top: nobTop, bottom: nobBottom } = ReactDOM.findDOMNode(
    currentNobRef
  ).getBoundingClientRect();
  return nobBottom - nobTop;
}

function findOneSector(currentContainerRef, nobSize) {
  const { top: containerTop, bottom: containerBottom } = ReactDOM.findDOMNode(
    currentContainerRef
  ).getBoundingClientRect();
  const sectorRange = containerBottom - containerTop - nobSize / 2;
  return parseFloat(sectorRange * 0.01);
}

function findSectors(oneSector) {
  return (() => {
    let sectors = [];
    for (let counter = 0; counter < 100; counter++) {
      const newSector = oneSector * counter;
      sectors = sectors.concat(newSector);
    }
    return sectors.reverse();
  })();
}
function findSector(sectors, nobMarginTop, nobSize) {
  let volume = 0;
  for (let sector of sectors) {
    if (nobMarginTop + nobSize / 2 >= sector) {
      break;
    }
    volume += 1;
  }
  return volume;
}

function useEventListeners(mousedown, setMousedown, setMousemove) {
  useEffect(() => {
    window.addEventListener(
      "mouseup",
      () => setMousedown(false) || setMousemove(false)
    );
    window.addEventListener(
      "mousemove",
      ({ pageX: x, pageY: y }) => mousedown && setMousemove({ x, y })
    );
  }, [mousedown, setMousedown, setMousemove]);
}
function useSliderMovementHandler(
  containerRef,
  mousedown,
  mousemove,
  marginTop,
  setMarginTop
) {
  useEffect(() => {
    if (!mousedown) {
      return;
    } else {
      const { y } = mousemove || mousedown;
      const { top, bottom } = ReactDOM.findDOMNode(
        containerRef.current
      ).getBoundingClientRect();
      const nobsize = vmin(1.3);
      if (y >= bottom - nobsize || y <= top + nobsize / 2 - vmin(0.5)) {
        return;
      }
      const newMarginTop = y - top - nobsize / 2;
      if (marginTop !== newMarginTop) {
        console.log(setMarginTop);
        setMarginTop(newMarginTop);
      }
    }
  }, [containerRef, mousedown, mousemove, marginTop, setMarginTop]);
}
export default VolumeController;
