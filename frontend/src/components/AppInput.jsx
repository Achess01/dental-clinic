import React from "react";

export const AppInput = (props) => {
  return (
    <fieldset className="input-group mb-3">
      <label className="input-group-text" id="basic-addon1">
        {props.label}
      </label>
      <input
        {...props.register}
        {...props}
        className="form-control"
        aria-label={props.label}
        aria-describedby="basic-addon1"
      />
    </fieldset>
  );
};

export const AppSelect = (props) => {
  return (
    <fieldset className="input-group mb-3">
      <label className="input-group-text" id="basic-addon1">
        {props.label}
      </label>
      <select
        className="form-select"
        aria-label={props.label}
        {...props.register}
        {...props}
      >
        {props.children}
      </select>
    </fieldset>
  );
};
