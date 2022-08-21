import React from "react";
import { SmallContainer } from "./Container";
import { Link } from "react-router-dom";
import {
  AdminNavBar,
  NoUserNavBar,
  SpecialistNavBar,
  SecretaryNavBar,
  AssistantNavBar,
  StaffNavBar,
} from "./NavBar";

export const Header = (props) => {
  const switchNavBar = (user = null) => {
    if (!user) {
      return <NoUserNavBar />;
    }

    if (user.is_staff) {
      return <StaffNavBar />;
    }

    if (user.is_admin) {
      return <AdminNavBar />;
    }

    if (user.is_specialist) {
      return <SpecialistNavBar />;
    }

    if (user.is_assistant) {
      return <AssistantNavBar />;
    }

    if (user.is_secretary) {
      return <SecretaryNavBar />;
    }

    return <NoUserNavBar />;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <SmallContainer>
        <Link className="navbar-brand" to="">
          <img src="/src/assets/CIAN.svg" alt="logo" width="40px" />
        </Link>
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
        {switchNavBar(props.user)}
      </SmallContainer>
    </nav>
  );
};
