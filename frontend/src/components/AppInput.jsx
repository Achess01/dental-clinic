import React from "react";

export const AppInput = (props) => {
  return (
    <fieldset className="input-group mb-3">
      {props.hidden ? (
        <></>
      ) : (
        <label className="input-group-text" id="basic-addon1">
          {props.icon ? <i className={props.icon}></i> : props.label}
        </label>
      )}

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

export const AppCheckbox = (props) => {
  return (
    <fieldset className="input-group mb-3">
      <label className="input-group-text" id="basic-addon1">
        {props.label}
      </label>
      <div className="input-group-text">
        <input
          {...props.register}
          {...props}
          type="checkbox"
          className="form-check-input"
          aria-label={props.label}
          aria-describedby="basic-addon1"
        />
      </div>
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

export const AppTextArea = (props) => {
  return (
    <fieldset className="">
      <label className="input-group-text" id="basic-addon1">
        {props.label}
      </label>
      <textarea
        {...props.register}
        {...props}
        className="form-control"
        aria-label={props.label}
        aria-describedby="basic-addon1"
      />
    </fieldset>
  );
};
