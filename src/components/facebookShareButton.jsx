import React from "react";
import facebookLogo from "../images/facebook-logo.svg";
import "./facebookShareButton.css";

function FacebookShareButton() {
  return (
    <div
      className="facebook-share-button-container"
      onClick={() =>
        window.open(
          "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.wakeywakey.me%2F&amp;src=sdkpreparse",
          "_blank",
          {},
          false
        )
      }
    >
      <img
        className="facebook-share-button-image"
        src={facebookLogo}
        alt="facebook logo"
      />
      <div className="facebook-share-button">Share</div>
    </div>
  );
}

export default FacebookShareButton;
