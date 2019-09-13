import React from "react";
import "./volumeController.css";

function VolumeController({ volume, setVolume, className, ...props }) {
  return (
    <div
      {...{
        className: `volume-controller${className ? " " + className : ""}`,
        ...props
      }}
    />
  );
}

export default VolumeController;
