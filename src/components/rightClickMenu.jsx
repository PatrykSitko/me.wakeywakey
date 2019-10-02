import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { getCorrectedPosition } from "./window";
import "./rightClickMenu.css";
const mouse = Object.freeze({ LEFT: 1, MIDDLE: 2, RIGHT: 3 });

function RightClickMenu({ children: menuEntries }) {
  const [mousedown, setMousedown] = useState(false);
  const [mouseleft, setMouseleft] = useState(false);
  const [mouseentered, setMouseentered] = useState(false);
  const [style, setStyle] = useState(undefined);
  const rightClickMenuRef = useRef();
  useWindowEventListeners(
    setMousedown,
    setMouseentered,
    setMouseleft,
    setStyle,
    rightClickMenuRef
  );
  useEffect(() => {
    if (mouseentered && mouseleft) {
      setMousedown(false);
      setMouseleft(false);
      setMouseentered(false);
      setStyle(undefined);
    }
  }, [mouseentered, mouseleft]);
  useRightClickMenuPosition(setStyle, mousedown, rightClickMenuRef);
  return (
    <div onMouseEnter={() => setMouseentered(true)}>
      <div
        {...{
          style: style && {
            top: style.top,
            left: style.left
          },
          ref: rightClickMenuRef,
          onMouseLeave: () => setMouseleft(true),
          className: `right-click-menu${
            mousedown ? " right-click-menu-visible" : ""
          }`
        }}
      >
        {mousedown &&
          [menuEntries]
            .flat(Infinity)
            .map(entry => React.cloneElement(entry, { setMouseleft }))}
      </div>
    </div>
  );
}
function useWindowEventListeners(
  setMousedown,
  setMouseentered,
  setMouseleft,
  setStyle,
  rightClickMenuRef
) {
  useEffect(
    () =>
      window.addEventListener(
        "mousedown",
        registerValidMousedown.bind(this, setMousedown)
      ),
    [setMousedown, setMouseleft, setMouseentered, setStyle, rightClickMenuRef]
  );
  useEffect(() => {
    window.onresize = () =>
      setMousedown(false) || setMouseentered(false) || setMouseleft(false);
  }, [setMousedown, setMouseentered, setMouseleft]);
}
function registerValidMousedown(setMousedown, { x, y, which: key, target }) {
  switch (key) {
    default:
      let mousedown = false;
      if (
        Object.values(target)[0].memoizedProps.className ===
        "right-click-menu-entry"
      ) {
        mousedown = true;
      }
      if (!mousedown) {
        setMousedown(false);
      }
      break;
    case mouse.RIGHT:
      setMousedown({ x, y });
      break;
  }
}

function useRightClickMenuPosition(setStyle, mousedown, rightClickMenuRef) {
  useEffect(() => {
    if (!rightClickMenuRef.current) {
      return;
    }
    const { width, height } = ReactDOM.findDOMNode(
      rightClickMenuRef.current
    ).getBoundingClientRect();
    if (!mousedown) {
      return;
    }
    setStyle(
      getCorrectedPosition(
        { x: mousedown.x + 54, y: mousedown.y + 54 },
        {
          width: Math.ceil(width),
          height: Math.ceil(height)
        }
      )
    );
  }, [setStyle, mousedown, rightClickMenuRef]);
}
export default RightClickMenu;
