import React from "react";
import "./facebookShareButton.css";

function FacebookShareButton() {
  return (
    <div
      class="fb-share-button"
      data-href="https://www.wakeywakey.me"
      data-layout="button_count"
      data-size="small"
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.wakeywakey.me%2F&amp;src=sdkpreparse"
        class="fb-xfbml-parse-ignore"
      >
        Share
      </a>
    </div>
  );
}

export default FacebookShareButton;
