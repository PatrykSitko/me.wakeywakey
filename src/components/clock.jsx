import React, { useState, useEffect } from "react";
import { playSound, sounds as sound } from "./soundPlayer";
import VolumeController from "./volumeController";
import speakerImage from "../images/speaker.svg";
import speakerMutedImage from "../images/speaker-muted.svg";
import FacebookShareButton from "./facebookShareButton";
import Numpad from "./numpad";
import "./clock.css";

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

function Clock({
  state,
  volume,
  setVolume,
  hideUI,
  className,
  buttonsMuted,
  setButtonsMuted,
  setWakeupTime,
  wakeupTimeExternal,
  setWakeupTimeExternal,
  marginTop,
  setMarginTop,
  useNumpadState,
  useTriggerInputFieldState,
  ...props
}) {
  const [number, setNumber] = useNumpadState;
  const [triggerNumpadEvent, setTriggerNumpadEvent] = useTriggerInputFieldState;
  const [hoursLeft, setHoursLeft] = useState(parseInt(hours.slice(0, 1)));
  const [hoursLeftAction, setHoursLeftAction] = useState("none");
  const [hoursRight, setHoursRight] = useState(parseInt(hours.slice(1, 2)));
  const [hoursRightAction, setHoursRightAction] = useState("none");
  const [minutesLeft, setMinutesLeft] = useState(parseInt(minutes.slice(0, 1)));
  const [minutesLeftAction, setMinutesLeftAction] = useState("none");
  const [minutesRight, setMinutesRight] = useState(
    parseInt(minutes.slice(1, 2))
  );
  const [currentNumberInputField, setCurrentNumberInputField] = useState(
    undefined
  );
  useEffect(() => {
    switch (currentNumberInputField) {
      default:
        setTriggerNumpadEvent(false);
        break;
      case 0:
        if (typeof number === "number") {
          setHoursLeft(number);
          setNumber(undefined);
          playSound(sound.tick, buttonsMuted, volume);
          setCurrentNumberInputField(currentNumberInputField + 1);
        }
        break;
      case 1:
        if (typeof number === "number") {
          setHoursRight(number);
          setNumber(undefined);
          playSound(sound.tick, buttonsMuted, volume);
          setCurrentNumberInputField(currentNumberInputField + 1);
        }
        break;
      case 2:
        if (typeof number === "number") {
          setMinutesLeft(number);
          setNumber(undefined);
          playSound(sound.tick, buttonsMuted, volume);
          setCurrentNumberInputField(currentNumberInputField + 1);
        }
        break;
      case 3:
        if (typeof number === "number") {
          setMinutesRight(number);
          setNumber(undefined);
          playSound(sound.tick, buttonsMuted, volume);
          setCurrentNumberInputField(undefined);
          playSound(sound.snooze, buttonsMuted, volume);
        }
        break;
    }
  }, [
    number,
    setNumber,
    currentNumberInputField,
    setCurrentNumberInputField,
    setTriggerNumpadEvent,
    buttonsMuted,
    volume
  ]);
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
  useEffect(() => {
    setWakeupTime({ minutesLeft, minutesRight, hoursLeft, hoursRight });
  }, [setWakeupTime, minutesLeft, minutesRight, hoursLeft, hoursRight]);
  useEffect(() => {
    if (wakeupTimeExternal) {
      setHoursLeft(parseInt(wakeupTimeExternal.hoursLeft));
      setHoursRight(parseInt(wakeupTimeExternal.hoursRight));
      setMinutesLeft(parseInt(wakeupTimeExternal.minutesLeft));
      setMinutesRight(parseInt(wakeupTimeExternal.minutesRight));
      setWakeupTimeExternal(undefined);
    }
  }, [
    wakeupTimeExternal,
    setWakeupTimeExternal,
    setHoursRight,
    setHoursLeft,
    setMinutesRight,
    setMinutesLeft
  ]);
  useEffect(() => {
    if (hideUI && typeof currentNumberInputField === "number") {
      setCurrentNumberInputField(undefined);
    }
  }, [hideUI, currentNumberInputField, setCurrentNumberInputField]);
  const goToNextField = param =>
    setCurrentNumberInputField(
      param === "quit" ? undefined : currentNumberInputField + 1
    );
  return (
    <div
      {...props}
      className={`clock${
        state === "on"
          ? " clock-running"
          : state === "snooze"
          ? " clock-snooze"
          : ""
      }${className ? " ".concat(className) : ""}`}
    >
      <Numpad
        useTriggerInputFieldState={[triggerNumpadEvent, setTriggerNumpadEvent]}
        useNumberState={[number, setNumber]}
      />
      <div className="clock-time clock-hours-left">
        {!hideUI &&
        typeof currentNumberInputField === "number" &&
        currentNumberInputField === 0 ? (
          <NumberInputField
            {...{
              onClick: () =>
                playSound(sound.snooze, buttonsMuted, volume) &&
                (setCurrentNumberInputField() || setTriggerNumpadEvent(false)),
              setNumber: number => setHoursLeft(number > 2 ? 2 : number),
              goToNextField,
              number: hoursLeft,
              mute: buttonsMuted,
              volume: volume
            }}
          />
        ) : (
          <Number
            {...{ hideUI }}
            disabled={hideUI}
            mute={buttonsMuted}
            setNumber={setHoursLeft}
            volume={volume}
            onClick={() =>
              !hideUI &&
              playSound(sound.snooze, buttonsMuted, volume) &&
              (setCurrentNumberInputField(0) || setTriggerNumpadEvent(true))
            }
          >
            {hoursLeft}
          </Number>
        )}
      </div>
      <div className="clock-time clock-hours-right">
        {!hideUI &&
        typeof currentNumberInputField === "number" &&
        currentNumberInputField === 1 ? (
          <NumberInputField
            {...{
              onClick: () =>
                playSound(sound.snooze, buttonsMuted, volume) &&
                (setCurrentNumberInputField() || setTriggerNumpadEvent(false)),
              setNumber: number =>
                setHoursRight(hoursLeft >= 2 && number > 3 ? 3 : number),
              goToNextField,
              number: hoursRight,
              mute: buttonsMuted,
              volume: volume
            }}
          />
        ) : (
          <Number
            {...{ hideUI }}
            disabled={hideUI}
            mute={buttonsMuted}
            setNumber={setHoursRight}
            volume={volume}
            onClick={() =>
              !hideUI &&
              playSound(sound.snooze, buttonsMuted, volume) &&
              (setCurrentNumberInputField(1) || setTriggerNumpadEvent(true))
            }
          >
            {hoursRight}
          </Number>
        )}
      </div>
      <div className="clock-separator">:</div>
      <div className="clock-time clock-minutes-left">
        {!hideUI &&
        typeof currentNumberInputField === "number" &&
        currentNumberInputField === 2 ? (
          <NumberInputField
            {...{
              onClick: () =>
                playSound(sound.snooze, buttonsMuted, volume) &&
                (setCurrentNumberInputField() || setTriggerNumpadEvent(false)),
              setNumber: number => setMinutesLeft(number > 5 ? 5 : number),
              goToNextField,
              number: minutesLeft,
              mute: buttonsMuted,
              volume: volume
            }}
          />
        ) : (
          <Number
            {...{ hideUI }}
            disabled={hideUI}
            mute={buttonsMuted}
            setNumber={setMinutesLeft}
            volume={volume}
            onClick={() =>
              !hideUI &&
              playSound(sound.snooze, buttonsMuted, volume) &&
              (setCurrentNumberInputField(2) || setTriggerNumpadEvent(true))
            }
          >
            {minutesLeft}
          </Number>
        )}
      </div>
      <div className="clock-time clock-minutes-right">
        {!hideUI &&
        typeof currentNumberInputField === "number" &&
        currentNumberInputField === 3 ? (
          <NumberInputField
            {...{
              onClick: () =>
                playSound(sound.snooze, buttonsMuted, volume) &&
                (setCurrentNumberInputField() || setTriggerNumpadEvent(false)),
              setNumber: setMinutesRight,
              goToNextField: () =>
                playSound(sound.snooze, buttonsMuted, volume) &&
                setCurrentNumberInputField(),
              number: minutesRight,
              mute: buttonsMuted,
              volume: volume
            }}
          />
        ) : (
          <Number
            {...{ hideUI }}
            disabled={hideUI}
            mute={buttonsMuted}
            setNumber={setMinutesRight}
            volume={volume}
            onClick={() =>
              !hideUI &&
              playSound(sound.snooze, buttonsMuted, volume) &&
              (setCurrentNumberInputField(3) || setTriggerNumpadEvent(true))
            }
          >
            {minutesRight}
          </Number>
        )}
      </div>
      <FacebookShareButton />
      <img
        className={`clock-buttons-mute${
          buttonsMuted ? " clock-buttons-muted" : ""
        }`}
        src={buttonsMuted ? speakerMutedImage : speakerImage}
        alt=""
        onClick={() =>
          setButtonsMuted(
            buttonsMuted
              ? (() => {
                  // setVolume(buttonsMuted);
                  return false;
                })()
              : volume
          )
        }
      />
      <VolumeController {...{ volume, setVolume, marginTop, setMarginTop }} />
    </div>
  );
}

function useIncrease(
  disabled,
  increase,
  setNumber,
  hideUI,
  mute,
  number,
  volume,
  timeout,
  settimeout
) {
  useEffect(() => {
    if (increase && !disabled && !timeout) {
      playSound(sound.tick, mute || hideUI, volume);
      const oldNumber = parseInt(number);
      setNumber(oldNumber >= 9 ? 0 : oldNumber + 1);
      settimeout(
        setTimeout(() => {
          clearTimeout(timeout);
          settimeout(false);
        }, 150)
      );
    }
  }, [
    disabled,
    increase,
    setNumber,
    hideUI,
    mute,
    number,
    volume,
    timeout,
    settimeout
  ]);
}

function useDecrease(
  disabled,
  decrease,
  setNumber,
  hideUI,
  mute,
  number,
  volume,
  timeout,
  settimeout
) {
  useEffect(() => {
    if (decrease && !disabled && !timeout) {
      playSound(sound.tick, mute || hideUI, volume);
      const oldNumber = parseInt(number);
      setNumber(oldNumber <= 0 ? 9 : oldNumber - 1);
      settimeout(
        setTimeout(() => {
          clearTimeout(timeout);
          settimeout(false);
        }, 150)
      );
    }
  }, [
    disabled,
    decrease,
    setNumber,
    hideUI,
    mute,
    number,
    volume,
    timeout,
    settimeout
  ]);
}

function Number({
  volume,
  mute,
  setNumber,
  hideUI,
  disabled,
  children: number,
  ...other
}) {
  if (number > 9) {
    setNumber(0);
    number = 0;
  }
  if (number < 0) {
    setNumber(9);
    number = 9;
  }
  const style = { opacity: hideUI ? 0 : 1 };
  const [increase, setIncrease] = useState(false);
  const [decrease, setDecrease] = useState(false);
  const [timeout, settimeout] = useState(false);
  useIncrease(
    disabled,
    increase,
    setNumber,
    hideUI,
    mute,
    number,
    volume,
    timeout,
    settimeout
  );
  useDecrease(
    disabled,
    decrease,
    setNumber,
    hideUI,
    mute,
    number,
    volume,
    timeout,
    settimeout
  );
  // copied from vasi (https://stackoverflow.com/users/7702397/vasi  -  https://stackoverflow.com/questions/31223341/detecting-scroll-direction)
  function findScrollDirectionOtherBrowsers(event) {
    if (disabled) {
      return;
    }
    var delta;

    if (event.wheelDelta) {
      delta = event.wheelDelta;
    } else {
      delta = -1 * event.deltaY;
    }

    if (delta < 0) {
      playSound(sound.tick, mute || hideUI, volume);
      const oldNumber = parseInt(number);
      setNumber(oldNumber <= 0 ? 9 : oldNumber - 1);
    } else if (delta > 0) {
      playSound(sound.tick, mute || hideUI, volume);
      const oldNumber = parseInt(number);
      setNumber(oldNumber >= 9 ? 0 : oldNumber + 1);
    }
  }
  return [
    <div
      key="plus"
      {...{ style }}
      className={`plus${hideUI ? " default-cursor" : ""}`}
      onMouseEnter={playSound.bind(
        this,
        sound.mouseEnterLeave,
        mute || hideUI,
        volume
      )}
      onMouseLeave={() =>
        playSound(sound.mouseEnterLeave, mute || hideUI, volume) &&
        setIncrease(false)
      }
      onMouseDown={() => setIncrease(true)}
      onMouseUp={() => setIncrease(false)}
    />,
    <div
      key="number-background"
      className={`number-background${hideUI ? " default-cursor" : ""}`}
      onWheel={findScrollDirectionOtherBrowsers}
    >
      8
    </div>,
    <div
      key="number"
      className={`number${parseInt(number) === 1 ? " number-one" : ""}${
        hideUI ? " default-cursor" : ""
      }`}
      onWheel={findScrollDirectionOtherBrowsers}
      {...other}
    >
      {number}
    </div>,
    <div
      key="minus"
      {...{ style }}
      className={`minus${hideUI ? " default-cursor" : ""}`}
      onMouseEnter={playSound.bind(
        this,
        sound.mouseEnterLeave,
        mute || hideUI,
        volume
      )}
      onMouseLeave={() =>
        playSound(sound.mouseEnterLeave, mute || hideUI, volume) &&
        setDecrease(false)
      }
      onMouseDown={() => setDecrease(true)}
      onMouseUp={() => setDecrease(false)}
    />
  ];
}

function registerKeyEvent(keys, setKeys, event) {
  if (event && event.key) {
    setKeys(keys.concat(event.key));
  }
}
function NumberInputField({
  number,
  setNumber,
  goToNextField,
  mute,
  volume,
  ...other
}) {
  const [numberBlinkingTimeout, setNumberBlinkingTimeout] = useState(undefined);
  const [numberBlink, switchNumberBlink] = useState(true);
  const [keyEventListener, setKeyEventListener] = useState(undefined);
  const [keys, setKeys] = useState([]);
  useEffect(() => {
    if (!keyEventListener) {
      setKeyEventListener(registerKeyEvent.bind(this, keys, setKeys));
      window.addEventListener(
        "keydown",
        registerKeyEvent.bind(this, keys, setKeys)
      );
    }
    return () => window.removeEventListener("keydown", keyEventListener);
  }, [goToNextField, keyEventListener, setKeyEventListener, keys, setKeys]);
  useEffect(() => {
    if (!numberBlinkingTimeout) {
      switchNumberBlink(!numberBlink);
      setNumberBlinkingTimeout(
        setTimeout(() => {
          setNumberBlinkingTimeout(clearTimeout(numberBlinkingTimeout));
        }, 1000)
      );
    }
    return () => clearTimeout(numberBlinkingTimeout);
  }, [
    numberBlinkingTimeout,
    setNumberBlinkingTimeout,
    numberBlink,
    switchNumberBlink
  ]);
  useEffect(() => {
    const nonNumbers = candidate =>
      candidate === "Enter"
        ? playSound(sound.tick, mute, volume) &&
          playSound(sound.snooze, mute, volume) &&
          goToNextField("quit")
        : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(candidate));
    const fliteredKeys = keys.filter(nonNumbers);
    if (fliteredKeys.length > 0) {
      setNumber(fliteredKeys.pop());
      playSound(sound.tick, mute, volume);
      goToNextField();
    }
  }, [keys, setNumber, goToNextField, mute, volume]);
  return [
    <div
      key="input-number-background"
      className={`input-number-background default-cursor`}
    >
      8
    </div>,
    <div
      key="input-number"
      className={`input-number${numberBlink ? " input-number-visible" : ""}${
        parseInt(number) === 1 ? " number-one" : ""
      } default-cursor`}
      {...other}
    >
      {number}
    </div>
  ];
}
export default Clock;
