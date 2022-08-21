import React from "react";

const NavBarItem = (props) => {
  return (
    <li className="nav-item">
      <a className="nav-link" href="#" {...props}>
        {props.children}
      </a>
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

export const AdminNavBar = (props) => {
  return (
    <NavBar>
      <NavBarItem>Hola</NavBarItem>
      <NavBarItem>Amigos</NavBarItem>
      <NavBarItem>
        <i class="bi bi-power"></i>
      </NavBarItem>
    </NavBar>
  );
};

export const NoUserNavBar = (props) => {
  return <NavBar></NavBar>;
};
