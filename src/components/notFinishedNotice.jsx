import React from "react";
import "./notFinishedNotice.css";

function NotFinishedNotice() {
  return (
    <div className="not-finished-notice">
      EDIT: Dear user, please forgive me that I haven't be able to finnish my
      website on time. The localStorage (that I had planned to use) is just too
      small (by design) to store all of your data. Please forgive me for this
      inconvenience, I'm working on a fix.
      <br />
      Thx for your patience, and feel free to enjoy all of the implemented
      functionality,
      <br /> have a wakey time 😉
    </div>
  );
}

// Dear user, this website is not finished yet.
//       <br />
//       I've been working on it since 10 september (2019).
//       <br />
//       Please give me a week and three days to implement all desired
//       functionality, thx in advance 😊 <br />
export default NotFinishedNotice;
