import React from "react";
import { Link } from "react-router-dom";
// Components 
import { LogOutButton } from "../personal/LogOut";

const NavBarItem = (props) => {
  return (
    <li className="nav-item">
      <Link className="nav-link" to={props.to || ""}>
        {props.children}
      </Link>
    </li>
  );
};

const NavBar = (props) => {
  return (
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">{props.children}</ul>
    </div>
  );
};

export const StaffNavBar = (props) => {
  return (
    <NavBar>
      <NavBarItem to="staff/personal">Personal</NavBarItem>
      <NavBarItem to="staff/appointments">Citas</NavBarItem>
      <NavBarItem to="staff/patients">Pacientes</NavBarItem>
      <NavBarItem to="staff/diagnostics">Diagnosticos</NavBarItem>
      <NavBarItem to="staff/treatments">Tratamientos</NavBarItem>
      <NavBarItem to="staff/treatments-performed">Tratamientos realizados</NavBarItem>
      <LogOutButton />
    </NavBar>
  );
};

export const AdminNavBar = (props) => {
  return <StaffNavBar />;
};

export const AssistantNavBar = (props) => {
  return (
    <NavBar>
      <NavBarItem to="assistant/appointments">Citas</NavBarItem>
      <NavBarItem to="assistant/patients">Pacientes</NavBarItem>
      <LogOutButton />
    </NavBar>
  );
};

export const SpecialistNavBar = (props) => {
  return (
    <NavBar>
      <NavBarItem to="specialist/appointments">Mis citas</NavBarItem>
      <NavBarItem to="specialist/patients">Pacientes</NavBarItem>
      <LogOutButton />
    </NavBar>
  );
};

export const SecretaryNavBar = (props) => {
  return (
    <NavBar>
      <NavBarItem to="secretary/appointments">Citas</NavBarItem>
      <NavBarItem to="secretary/patients">Pacientes</NavBarItem>
      <LogOutButton />
    </NavBar>
  );
};

export const NoUserNavBar = (props) => {
  return <NavBar></NavBar>;
};
