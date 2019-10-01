import React from "react";
import "./rightClickMenuEntry.css";

function rightClickMenuEntry({ title, action }) {
  return (
    <div className="right-click-menu-entry" onClick={action}>
      {title}
    </div>
  );
}
