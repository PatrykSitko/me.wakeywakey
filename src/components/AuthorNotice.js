import React from "react";
import "./AuthorNotice.css";

function AuthorNotice() {
  return (
    <p className="author-and-owner-notice">
      Created by{" "}
      <span
        className="copyright-notice"
        role="img"
        aria-label="Copyright notice"
      >
        ©️
      </span>
      Patryk Sitko
    </p>
  );
}

export default AuthorNotice;
