import React, { useRef } from "react";
import "./volumeController.css";

function VolumeController({ volume, setVolume, className, ...props }) {
  const ref = useRef();
  return (
    <div
      {...{
        ref,
        className: `volume-controler${className ? " " + className : ""}`,
        ...props
      }}
    />
  );
}
