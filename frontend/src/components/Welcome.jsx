/* Welcome */
import React from "react";
// Components
import { SmallContainer } from "./Container";
import logo from "../assets/CIAN.svg";

export const Welcome = (props) => (
  <SmallContainer>
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1>Bienvenido</h1>
      <img src={logo} alt="logo" width="300px" />
    </div>
  </SmallContainer>
);
