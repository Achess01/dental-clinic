import React, { useState, useEffect } from "react";

// Components
import { CreatePersonalForm } from "./CreatePersonal";
import { SmallContainer } from "../components/Container";
import { Spinner } from "../components/Spinner";
import { AppButtonDanger, AppButtonDark } from "../components/AppButton";

// Redux
import { useSelector } from "react-redux";

// Api
import {
  getUser,
  updateUser,
  resetPassword,
  deleteUser as deleteUserAPI,
} from "../config/api";

import { useParams, useNavigate } from "react-router-dom";

export const EditPersonalView = (props) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const { username } = useParams();

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const onSubmit = async (data) => {
    const response = await updateUser({ username, token: user.token, data });
    if (!response) {
      alert("Error");
    } else {
      alert("Usuario editado con éxito");
    }

    navigate("../personal");
  };

  const resetUserPassword = async (e) => {
    let choice = confirm("¿Desea resetear la contraseña de este usuario?");
    if (choice) {
      const response = await resetPassword({ username, token: user.token });
      if (!response) {
        alert("Error");
      } else {
        alert(`La nueva contraseña es ${response["new_password"]}`);
      }
    }
  };

  const deleteUser = async (e) => {
    let choice = confirm("¿Desea ELIMINAR este usuario?");
    if (choice) {
      const response = await deleteUserAPI({ username, token: user.token });
      if (!response) {
        alert("Error");
      } else {
        alert(`Usuario eliminado`);
        navigate("../personal");
      }
    }
  };

  useEffect(() => {
    const userFromApi = async () => {
      setLoading(true);
      const response = await getUser({ username, token: user.token });
      if (response !== null) {
        const data = {
          username: response.username,
          phone_number: response.phone_number,
          first_name: response.first_name,
          second_name: response.second_name,
          last_name: response.last_name,
          last_mother_name: response.last_mother_name,
        };
        setUserData(data);
      } else {
        return;
      }
      setLoading(false);
    };

    userFromApi();
  }, []);

  const editUser = () => (
    <>
      <h3>Editar personal</h3>
      <div className="m-3">
        <AppButtonDanger onClick={deleteUser}>Eliminar</AppButtonDanger>
        {user.is_staff && (
          <AppButtonDark onClick={resetUserPassword}>
            Resetear password
          </AppButtonDark>
        )}
      </div>
      <CreatePersonalForm onSubmit={onSubmit} values={userData} edit />
    </>
  );

  return (
    <SmallContainer>
      <div className="d-flex flex-column align-items-center justify-content-center m-5">
        {loading ? <Spinner /> : editUser()}
      </div>
    </SmallContainer>
  );
};
