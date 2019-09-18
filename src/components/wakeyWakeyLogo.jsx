import React from "react";
import "./wakeyWakeyLogo.css";
import wakeyWakeyLogoImage from "../images/wakey-wakey-logo.png";

function WakeyWakeyLogo() {
  return (
    <img
      className="logo-container"
      src={wakeyWakeyLogoImage}
      alt="wakey wakey logo"
    />
  );
}

export default WakeyWakeyLogo;
