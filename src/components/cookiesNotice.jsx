import React, { useState, useEffect } from "react";
import { playSound, sounds as sound } from "./soundPlayer";
import "./cookiesNotice.css";

function CookiesNotice({ cookiesAccepted, setCookiesAccepted, mute, volume }) {
  const [removeContainer, setRemoveContainer] = useState(cookiesAccepted);
  const [containerClassName, setContainerClassName] = useState(
    "cookies-notice-container"
  );
  useEffect(() => {
    if (
      containerClassName === "cookies-notice-container" &&
      !cookiesAccepted &&
      cookiesAccepted !== null
    ) {
      const timeout = setTimeout(() => {
        setContainerClassName(
          containerClassName.concat(" cookies-notice-container-visible")
        );
        clearTimeout(timeout);
      }, 1);
    }
    if (
      containerClassName ===
        "cookies-notice-container cookies-notice-container-visible" &&
      (cookiesAccepted || cookiesAccepted === null)
    ) {
      const containerTimeout = setTimeout(
        () => setRemoveContainer(true) || clearTimeout(containerTimeout),
        900
      );
      const timeout = setTimeout(
        () =>
          setContainerClassName("cookies-notice-container") ||
          clearTimeout(timeout),
        1
      );
    }
  }, [
    containerClassName,
    setContainerClassName,
    cookiesAccepted,
    setRemoveContainer
  ]);
  return (
    !removeContainer && (
      <div className={containerClassName}>
        <div className="cookies-notice">
          This website is using your window local storage to store application
          state. By clicking accept you will allow me to make use of your (sadly
          limited{" "}
          <span role="img" aria-label="Sad face">
            😢
          </span>
          ) local storage space to store application state.
          <br /> By declining, I won't store any of the application state into
          your local storage.
          <br />
          Never do I store any of your data at remote locations.
        </div>
        <div className="cookies-notice-buttons-container">
          <div
            onMouseEnter={playSound.bind(
              this,
              sound.mouseEnterLeave,
              mute,
              volume
            )}
            onMouseLeave={playSound.bind(
              this,
              sound.mouseEnterLeave,
              mute,
              volume
            )}
            onClick={() =>
              playSound(sound.confirm, mute, volume) && setCookiesAccepted(true)
            }
            className="cookies-notice-accept-button"
          >
            Accept
          </div>
          <div
            onMouseEnter={playSound.bind(
              this,
              sound.mouseEnterLeave,
              mute,
              volume
            )}
            onMouseLeave={playSound.bind(
              this,
              sound.mouseEnterLeave,
              mute,
              volume
            )}
            onClick={() =>
              playSound(sound.confirm, mute, volume) && setCookiesAccepted(null)
            }
            className="cookies-notice-decline-button"
          >
            Decline
          </div>
        </div>
      </div>
    )
  );
}

export default CookiesNotice;
