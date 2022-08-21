import React from "react";
// Redux
import { useDispatch } from "react-redux";
import { logOut } from "../store/user";

export const LogOutButton = (props) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(logOut());
  };
  return (
    <button onClick={onClick} className="nav-item btn bi bi-power text-white" />
  );
};
