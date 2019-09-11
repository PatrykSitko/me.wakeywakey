import React, { useState, useEffect } from "react";
import tickSound from "../sounds/buttons/tick.mp3";
import speakerImage from "../images/speaker.svg";
import speakerMutedImage from "../images/speaker-muted.svg";
import "./clock.css";

function playTickSound() {
  const player = document.createElement("audio");
  player.setAttribute("src", tickSound);
  player.play();
}

function useMinutesCalibrator(
  hoursLeft,
  hoursRight,
  setHoursLeft,
  setHoursRight,
  minutesLeft,
  setMinutesLeft,
  minutesRight,
  setMinutesRight,
  hoursRightAction,
  setHoursRightAction,
  minutesLeftAction,
  setMinutesLeftAction
) {
  useEffect(() => {
    let skipDecrease = false;
    if (minutesLeft < 6 && minutesLeft > 1 && hoursRightAction !== "increase") {
      setHoursRightAction("increase");
    }
    if (minutesLeft < 1 && hoursRightAction !== "decrease") {
      setHoursRightAction("decrease");
    }
    if (minutesLeft >= 6 && hoursRightAction === "increase") {
      if (hoursLeft < 2 || hoursRight < 4) {
        setHoursRight(hoursRight + 1);
      }
      if (hoursLeft === 2 && hoursRight === 3 && minutesRight === 9) {
        setMinutesRight(0);
      }
      setMinutesLeft(0);
      setHoursRightAction("none");
      skipDecrease = true;
    }
    if (minutesLeft >= 6 && hoursRightAction === "decrease") {
      if (hoursLeft > 0 || hoursRight > 0) {
        setHoursRight(hoursRight - 1);
      } else {
        setHoursLeft(2);
        setHoursRight(3);
        if (minutesRight === 0) {
          skipDecrease = true;
          setMinutesRight(9);
        }
      }
      setMinutesLeft(5);
      setHoursRightAction("none");
    }
    // minutes right
    if (minutesRight === 9) {
      setMinutesLeftAction("increase");
    }
    if (minutesRight < 9 && minutesLeftAction === "increase") {
      setMinutesLeftAction("none");
    }
    if (minutesLeftAction === "increase" && minutesRight === 0) {
      setMinutesLeftAction("none");
      setMinutesLeft(minutesLeft + 1);
    }
    if (minutesRight === 0) {
      setMinutesLeftAction("decrease");
    }
    if (
      (minutesRight > 0 &&
        minutesRight < 9 &&
        minutesLeftAction === "decrease") ||
      skipDecrease
    ) {
      setMinutesLeftAction("none");
    }
    if (minutesLeftAction === "decrease" && minutesRight === 9) {
      setMinutesLeftAction("none");
      setMinutesLeft(minutesLeft - 1);
    }
  }, [
    hoursLeft,
    hoursRight,
    setHoursLeft,
    setHoursRight,
    minutesLeft,
    setMinutesLeft,
    minutesRight,
    setMinutesRight,
    hoursRightAction,
    setHoursRightAction,
    minutesLeftAction,
    setMinutesLeftAction
  ]);
}

function useHoursCalibrator(
  setMinutesLeft,
  setMinutesRight,
  minutesLeft,
  minutesRight,
  hoursLeft,
  setHoursLeft,
  hoursRight,
  setHoursRight,
  hoursLeftAction,
  setHoursLeftAction
) {
  useEffect(() => {
    if (hoursLeft === 2 && hoursRight === 4) {
      setHoursLeft(0);
      setHoursRight(0);
    }
    if (hoursLeft > 2 && hoursLeft !== 3) {
      setHoursLeft(2);
    }
    if (hoursLeft === 3) {
      setHoursLeft(0);
      setHoursRight(0);
    }
    if (hoursLeft >= 2) {
      if (hoursRight > 4) {
        setHoursRight(3);
      }
    }
    if (hoursLeft < 2) {
      if (hoursRight === 9) {
        setHoursLeftAction("increase");
      }
      if (hoursRight < 9 && hoursLeftAction === "increase") {
        setHoursLeftAction("none");
      }
      if (hoursLeftAction === "increase" && hoursRight === 0) {
        setHoursLeftAction("none");
        setHoursLeft(hoursLeft + 1);
      }
    }
    if (hoursLeft > 0) {
      if (hoursRight === 0) {
        setHoursLeftAction("decrease");
      }
      if (hoursRight > 0 && hoursLeftAction === "decrease") {
        setHoursLeftAction("none");
      }
      if (
        hoursLeftAction === "decrease" &&
        (hoursRight === 9 || (hoursLeft === 2 && hoursRight === 4))
      ) {
        setHoursLeftAction("none");
        if (hoursLeft === 2) {
          setHoursRight(9);
        }
        setHoursLeft(hoursLeft - 1);
      }
    } else if (hoursLeft === 0) {
      if (hoursRight === 0) {
        setHoursLeftAction("decrease");
      }
      if (hoursRight > 0 && hoursLeftAction === "decrease") {
        setHoursLeftAction("none");
      }
      if (hoursLeftAction === "decrease" && hoursRight === 9) {
        setHoursLeftAction("none");
        setHoursLeft(2);
        setHoursRight(3);
      }
    }
  }, [
    setMinutesLeft,
    setMinutesRight,
    minutesLeft,
    minutesRight,
    hoursLeft,
    setHoursLeft,
    hoursRight,
    setHoursRight,
    hoursLeftAction,
    setHoursLeftAction
  ]);
}

const date = new Date();
const hours =
  date.getHours().toString().length > 1
    ? date.getHours().toString()
    : "0".concat(date.getHours().toString());
const minutes =
  date.getMinutes().toString().length > 1
    ? date.getMinutes().toString()
    : "0".concat(date.getMinutes().toString());

function Clock({ hideUI, className, ...props }) {
  const [hoursLeft, setHoursLeft] = useState(parseInt(hours.slice(0, 1)));
  const [hoursLeftAction, setHoursLeftAction] = useState("none");
  const [hoursRight, setHoursRight] = useState(parseInt(hours.slice(1, 2)));
  const [hoursRightAction, setHoursRightAction] = useState("none");
  const [minutesLeft, setMinutesLeft] = useState(parseInt(minutes.slice(0, 1)));
  const [minutesLeftAction, setMinutesLeftAction] = useState("none");
  const [minutesRight, setMinutesRight] = useState(
    parseInt(minutes.slice(1, 2))
  );
  const [buttonsMuted, setButtonsMuted] = useState(false);
  useMinutesCalibrator(
    hoursLeft,
    hoursRight,
    setHoursLeft,
    setHoursRight,
    minutesLeft,
    setMinutesLeft,
    minutesRight,
    setMinutesRight,
    hoursRightAction,
    setHoursRightAction,
    minutesLeftAction,
    setMinutesLeftAction
  );
  useHoursCalibrator(
    setMinutesLeft,
    setMinutesRight,
    minutesLeft,
    minutesRight,
    hoursLeft,
    setHoursLeft,
    hoursRight,
    setHoursRight,
    hoursLeftAction,
    setHoursLeftAction
  );
  return (
    <div
      {...props}
      className={`clock${className ? " ".concat(className) : ""}`}
    >
      <div className="clock-time clock-hours-left">
        <Number
          {...{ hideUI }}
          disabled={hideUI}
          mute={buttonsMuted}
          setNumber={setHoursLeft}
        >
          {hoursLeft}
        </Number>
      </div>
      <div className="clock-time clock-hours-right">
        <Number
          {...{ hideUI }}
          disabled={hideUI}
          mute={buttonsMuted}
          setNumber={setHoursRight}
        >
          {hoursRight}
        </Number>
      </div>
      <div className="clock-separator">:</div>
      <div className="clock-time clock-minutes-left">
        <Number
          {...{ hideUI }}
          disabled={hideUI}
          mute={buttonsMuted}
          setNumber={setMinutesLeft}
        >
          {minutesLeft}
        </Number>
      </div>
      <div className="clock-time clock-minutes-right">
        <Number
          {...{ hideUI }}
          disabled={hideUI}
          mute={buttonsMuted}
          setNumber={setMinutesRight}
        >
          {minutesRight}
        </Number>
      </div>
      <img
        className="clock-buttons-mute"
        src={buttonsMuted ? speakerMutedImage : speakerImage}
        alt=""
        onClick={() => setButtonsMuted(!buttonsMuted)}
      />
    </div>
  );
}

function Number({ mute, setNumber,hideUI, disabled, children: number }) {
  if (number > 9) {
    setNumber(0);
    number = 0;
  }
  if (number < 0) {
    setNumber(9);
    number = 9;
  }
  const style={opacity:hideUI?0:1};
  return [
    <div
      key="plus"
      {...{style}}
      className="plus"
      onClick={() => {
        if (disabled) {
          return;
        }
        if (!mute) {
          playTickSound();
        }
        const oldNumber = parseInt(number);
        setNumber(oldNumber >= 9 ? 0 : oldNumber + 1);
      }}
    />,
    <div key="number-background" className="number-background">
      8
    </div>,
    <div
      key="number"
      className={`number${parseInt(number) === 1 ? " number-one" : ""}`}
    >
      {number}
    </div>,
    <div
      key="minus"
      {...{style}}
      className="minus"
      onClick={() => {
        if (disabled) {
          return;
        }
        if (!mute) {
          playTickSound();
        }
        const oldNumber = parseInt(number);
        setNumber(oldNumber <= 0 ? 9 : oldNumber - 1);
      }}
    />
  ];
}
export default Clock;
