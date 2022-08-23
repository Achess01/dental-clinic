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

import { useSelector } from "react-redux";

export const Header = (props) => {
  const user = useSelector((state) => state.user.user);

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

  const choiceRoleName = (user = null) => {
    if (!user) {
      return "";
    }

    if (user.is_staff) {
      return "Super";
    }

    if (user.is_admin) {
      return "Administrador";
    }

    if (user.is_specialist) {
      return "Especialista";
    }

    if (user.is_assistant) {
      return "Asistente";
    }

    if (user.is_secretary) {
      return "Secretaria/o";
    }

    return "";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <SmallContainer>
        <Link className="navbar-brand" to="">
          <img src="/src/assets/CIAN.svg" alt="logo" width="40px" />
        </Link>
        {user && (
          <div className="me-5">
            <p className="text-white m-0">
              {choiceRoleName(user)}:{" "}
              <i>
                {user.username} {user.first_name} {user.last_name}
              </i>
            </p>
          </div>
        )}
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
        {switchNavBar(user)}
      </SmallContainer>
    </nav>
  );
};
