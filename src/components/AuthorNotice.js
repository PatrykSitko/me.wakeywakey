import React from "react";
import "./AuthorNotice.css";

function AuthorNotice() {
  return (
    <p className="author-and-owner-notice">
      Created by{" "}
      <a
        href="https://twitter.com/PatrykSitkoJS"
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
    </p>
  );
}

export default AuthorNotice;
