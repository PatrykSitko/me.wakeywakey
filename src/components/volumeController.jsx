import React from "react";
import "./volumeController.css";

function VolumeController({ volume, setVolume, className, ...props }) {
  return [
    <div key="volume-controller" className="volume-controller" />,
    <div
      {...{
        key: "volume-controller-container",
        className: `volume-controller-container${
          className ? " " + className : ""
        }`,
        ...props
      }}
    >
      <div className="volume-controller-nob"/>
      <div className="volume-controller-volume-indicator"/>
    </div>
  ];
}

export default VolumeController;
