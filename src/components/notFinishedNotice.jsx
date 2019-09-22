import React, { useState, useEffect } from "react";
import "./notFinishedNotice.css";

function NotFinishedNotice() {
  const [isColapsed, setIsColapsed] = useState(true);
  const [coreWordColor, setCoreWordColor] = useState({ color: undefined });
  return (
    <div className={`not-finished-notice${isColapsed ? "-colapsed" : ""}`}>
      {isColapsed ? (
        <ColapsableButton
          {...{ colapsedState: isColapsed, getColapsedState: setIsColapsed }}
        >
          {isColapsed
            ? "Read the not finished notice 😉"
            : "I have read the not finished notice and accepted."}
        </ColapsableButton>
      ) : (
        ""
      )}
      EDIT: Dear user, please forgive me that I haven't be able to finnish my
      website on time. The localStorage (that I had planned to use) is just too
      small (by design) to store all of your data. Please forgive me for this
      inconvenience, I'm working on a fix.
      <br />
      Thx for your patience, and feel free to enjoy all of the implemented
      functionality,
      <br /> have a wakey time 😉
      {!isColapsed ? (
        <ColapsableButton
          {...{
            onMouseEnter: () => {
              setCoreWordColor({ color: "red" });
              const timeout = setTimeout(() => {
                setCoreWordColor({ color: undefined });
                clearTimeout(timeout);
              }, 500);
            },
            onMouseLeave: () => setCoreWordColor({ color: undefined }),
            colapsedState: isColapsed,
            getColapsedState: setIsColapsed
          }}
        >
          I have read the not finished{" "}
          <span style={coreWordColor}>notice and accept</span>
          ed.
        </ColapsableButton>
      ) : (
        ""
      )}
    </div>
  );
}
function ColapsableButton({
  getColapsedState: setColapsedState,
  colapsedState = true,
  children: buttonText,
  ...other
}) {
  const [colapsed, toggle] = useColapsed(colapsedState);
  useEffect(() => {
    setColapsedState(colapsed);
  }, [colapsed, setColapsedState]);
  return (
    <div
      {...other}
      className={`not-finished-notice-colapsable-button${
        colapsed ? "" : " not-finished-notice-colapsable-button-colapsed"
      }`}
      onClick={toggle}
    >
      {buttonText}
    </div>
  );
}
function useColapsed(colapsedState) {
  const [isColapsed, setIsColapsed] = useState(
    typeof colapsedState === "boolean" ? colapsedState : true
  );
  const toggle = () => setIsColapsed(!isColapsed);
  return [isColapsed, toggle];
}

// Dear user, this website is not finished yet.
//       <br />
//       I've been working on it since 10 september (2019).
//       <br />
//       Please give me a week and three days to implement all desired
//       functionality, thx in advance 😊 <br />
export default NotFinishedNotice;
