import React from "react";
import { SmallContainer } from "./Container";
import { AdminNavBar, NoUserNavBar} from "./NavBar";

export const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <SmallContainer>
        <a className="navbar-brand" href="#">
          <img src="/src/assets/CIAN.svg" alt="logo" width="40px" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <AdminNavBar />        
      </SmallContainer>
    </nav>
  );
};
