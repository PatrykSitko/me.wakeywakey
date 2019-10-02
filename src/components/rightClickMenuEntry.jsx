import React, { useRef } from "react";
import "./rightClickMenuEntry.css";

const mouse = Object.freeze({ LEFT: 1, MIDDLE: 2, RIGHT: 3 });

function RightClickMenuEntry({
  setMouseleft,
  setMouseentered,
  title,
  children: title_alt,
  action,
  className,
  ...other
}) {
  const ref = useRef();
  return (
    <div
      ref={ref}
      onClick={e => {
        if (e.switch !== mouse.LEFT) action(e);
        setMouseleft(true);
      }}
      className={`right-click-menu-entry${
        typeof className === "string" ? " ".concat(className) : ""
      }`}
      {...other}
    >
      {title || title_alt}
    </div>
  );
}

export default RightClickMenuEntry;
