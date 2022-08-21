import React from "react";

export const AppButton = (props) => {
  return (
    <button className="btn btn-primary m-1 btn__clinic" {...props}>
      {props.children}
    </button>
  );
};

export const AppButtonSecondary = (props) => {
  return (
    <button className="btn btn-secondary m-1" {...props}>
      {props.children}
    </button>
  );
};

export const AppButtonDanger = (props) => {
  return (
    <button className="btn btn-danger m-1" {...props}>
      {props.children}
    </button>
  );
};

export const AppButtonDark = (props) => {
  return (
    <button className="btn btn-dark m-1" {...props}>
      {props.children}
    </button>
  );
};
