import React from "react";
import "./background.css";

function Background({ day, night }) {
  return <video className="background" src={night} autoPlay loop muted />;
}

export default Background;
