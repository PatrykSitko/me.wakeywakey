import React, { useState } from "react";
import { playSound, sounds as sound } from "./soundPlayer";
import "./AuthorNotice.css";

function AuthorNotice({ mute, volume }) {
  const [clicked, setClicked] = useState(false);
  return (
    <p className="author-and-owner-notice">
      Created by{" "}
      <span
        onMouseEnter={playSound.bind(this, sound.mouseEnterLeave, mute, volume)}
        onMouseLeave={() =>
          !clicked && playSound(sound.mouseEnterLeave, mute, volume)
        }
        onClick={() => {
          playSound(sound.twitter, mute, volume);
          setClicked(true);
          const timeout = setTimeout(
            () => clearTimeout(timeout) || setClicked(false),
            1
          );
        }}
      >
        <a
          href="https://facebook.com/PatrykSitkoJS"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span
            className="copyright-notice"
            role="img"
            aria-label="Copyright notice"
          >
            ©️
          </span>
          Patryk Sitko
        </a>
      </span>
    </p>
  );
}

export default AuthorNotice;
