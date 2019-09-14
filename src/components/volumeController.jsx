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
  return [
    <div
      key="volume-controller"
      ref={containerRef}
      className="volume-controller"
      onMouseDown={() => setMousedown(true)}
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
