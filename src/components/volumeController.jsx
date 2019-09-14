import React, { useState, useEffect, useRef } from "react";
import { vmin } from "./vscale.js";
import ReactDOM from "react-dom";
import "./volumeController.css";

function VolumeController({ volume, setVolume, className, ...props }) {
  const [mousedown, setMousedown] = useState(undefined);
  const [mousemove, setMousemove] = useState(undefined);
  const containerRef = useRef();
  const nobRef = useRef();
  const [volumeControllerNobStyle, setVolumeControllerNobStyle] = useState({
    marginTop: 0
  });
  useEffect(() => {
    if (!mousedown) {
      return;
    } else {
      const { y } = mousemove;
      const { top, bottom } = ReactDOM.findDOMNode(
        containerRef.current
      ).getBoundingClientRect();
      const nobsize = vmin(1.3);
      if (y >= bottom - nobsize / 2 || y <= top + nobsize / 2) {
        return;
      }
      const newMarginTop = y - nobsize / 2 - top;
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
  return [
    <div
      key="volume-controller"
      ref={containerRef}
      className="volume-controller"
      onMouseMove={({ pageX: x, pageY: y }) => setMousemove({ x, y })}
      onMouseDown={() => setMousedown(true)}
      onMouseUp={() => {
        setMousedown(false);
      }}
      onMouseLeave={() => setMousedown(false)}
    />,
    <div
      {...{
        key: "volume-controller-container",
        className: `volume-controller-container${
          className ? " " + className : ""
        }`,
        ...props
      }}
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

export default VolumeController;
