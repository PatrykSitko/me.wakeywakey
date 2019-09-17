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
  ...props
}) {
  const [mousedown, setMousedown] = useState(undefined);
  const [mousemove, setMousemove] = useState(undefined);
  const containerRef = useRef();
  const nobRef = useRef();
  const [volumeControllerNobStyle, setVolumeControllerNobStyle] = useState({
    marginTop: 0 - vmin(0.5)
  });
  useEventListeners(mousedown, setMousedown, setMousemove);
  useSliderMovementHandler(
    containerRef,
    mousedown,
    mousemove,
    volumeControllerNobStyle,
    setVolumeControllerNobStyle
  );
  useEffect(() => {
    const { top: nobTop, bottom: nobBottom } = ReactDOM.findDOMNode(
      nobRef.current
    ).getBoundingClientRect();
    const { top: containerTop, bottom: containerBottom } = ReactDOM.findDOMNode(
      containerRef.current
    ).getBoundingClientRect();
    const nobSize = nobBottom - nobTop;
    const sectorRange = containerBottom - containerTop - nobSize / 2;
    const oneSector = sectorRange * 0.01;
    // const sector = containerBottom - nobBottom - nobSize / 2;
    const sectors = (() => {
      let sectors = [];
      for (let counter = 0; counter < 100; counter++) {
        const newSector = oneSector * counter;
        sectors = sectors.concat(newSector);
      }
      return sectors.reverse();
    })();
    const currentSector = findSector(
      sectors,
      volumeControllerNobStyle.marginTop,
      nobSize
    );
    let volume = `${currentSector / 100}`;
    const dotIndex = volume.indexOf(".");
    volume = volume.slice(0, dotIndex + 2);
    volume = parseFloat(volume);
    setVolume(volume > 1 ? 1 : volume < 0 ? 0 : volume);
  }, [
    nobRef,
    containerRef,
    volume,
    setVolume,
    mousedown,
    mousemove,
    volumeControllerNobStyle
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
      onMouseDown={() => setMousedown(true)}
    >
      <div
        ref={nobRef}
        className="volume-controller-nob"
        style={volumeControllerNobStyle}
      />
      <div className="volume-controller-volume-indicator" />
    </div>
  ];
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
    window.addEventListener("mouseup", () => setMousedown(false));
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
  volumeControllerNobStyle,
  setVolumeControllerNobStyle
) {
  useEffect(() => {
    if (!mousedown || !mousemove) {
      return;
    } else {
      const { y } = mousemove;
      const { top, bottom } = ReactDOM.findDOMNode(
        containerRef.current
      ).getBoundingClientRect();
      const nobsize = vmin(1.3);
      if (y >= bottom - nobsize || y <= top + nobsize / 2 - vmin(0.5)) {
        return;
      }
      const newMarginTop = y - top - nobsize / 2;
      if (volumeControllerNobStyle.marginTop !== newMarginTop) {
        setVolumeControllerNobStyle({
          ...volumeControllerNobStyle,
          marginTop: newMarginTop
        });
      }
    }
  }, [
    containerRef,
    mousedown,
    mousemove,
    volumeControllerNobStyle,
    setVolumeControllerNobStyle
  ]);
}
export default VolumeController;
