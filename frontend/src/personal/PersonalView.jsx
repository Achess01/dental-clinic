import React, { useState, useEffect } from "react";

// Router
import { Link } from "react-router-dom";

// Components
import { CreatePersonalForm } from "./CreatePersonal";
import { SmallContainer } from "../components/Container";
import { AppSelect } from "../components/AppInput";
import { AppButtonSecondary, AppButtonDark } from "../components/AppButton";
import { Spinner } from "../components/Spinner";
import { ErrorFieldForm } from "../components/ErrorFieldForm";

// Redux
import { useSelector } from "react-redux";

// Api
import { getUsers, signUpUser } from "../config/api";

export const PersonalView = (props) => {
  const [type, setType] = useState("secretaries");
  const [create, setCreate] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);

  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({});

  const user = useSelector((state) => state.user.user);
  const onSubmit = async (data) => {
    setLoadingSignUp(true);
    const response = await signUpUser({ data, type, token: user.token });
    setLoadingSignUp(false);
    if (!response) {
      setError(true);
    } else {
      setUserData(response);
      setError(false);
    }
  };

  useEffect(() => {
    if (type === "assistants") {
      // Get all specialists
    }
  }, [type]);

  useEffect(() => {
    const usersFromApi = async () => {
      setLoading(true);
      const response = await getUsers(user.token);
      if (response !== null) {
        setUsuarios(response);
      }
      setLoading(false);
    };

    usersFromApi();
  }, []);

  const createNewUser = () => (
    <>
      <AppButtonSecondary
        onClick={(e) => {
          setCreate(false);
          setError(false);
          setUserData({});
        }}
      >
        X
      </AppButtonSecondary>
      <h3>Agregar personal</h3>
      <div>
        <AppSelect
          label="Tipo de usuario"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="secretaries">Secretaria/o</option>
          <option value="specialists">Especialista</option>
          <option value="assistants">Asistente</option>
          {user.is_staff && <option value="admins">Administrador</option>}
        </AppSelect>
      </div>
      {loadingSignUp ? (
        <Spinner />
      ) : (
        <CreatePersonalForm
          onSubmit={onSubmit}
          assistant={type === "assistants"}
          specialist={type === "specialists"}
        />
      )}
      {error && (
        <ErrorFieldForm>
          Error al crear el usuario, verifique que el rut no sea repetido
        </ErrorFieldForm>
      )}

      <div className="card mb-5 mt-3">
        <ul className="list-group list-group-flush">
          {Object.entries(userData).map((data, index) => (
            <li className="list-group-item" key={index}>
              {data[0]}: {data[1]}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const TableUsers = (usuarios) => (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Rut</th>
          <th scope="col">Número de teléfono</th>
          <th scope="col">Nombre</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((u, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{u.username}</td>
            <td>{u.phone_number}</td>
            <td>{`${u.first_name} ${u.last_name}`}</td>
            <td>
              <Link to={u.username}>Editar</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <SmallContainer>
      <div className="d-flex flex-column align-items-center justify-content-center m-5">
        <AppButtonDark onClick={(e) => setCreate(true)}>
          Agregar personal
        </AppButtonDark>
        {create && createNewUser()}
        {loading ? <Spinner /> : TableUsers(usuarios)}
      </div>
    </SmallContainer>
  );
};
