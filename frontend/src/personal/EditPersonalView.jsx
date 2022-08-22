import React, { useState, useEffect } from "react";

// Components
import { CreatePersonalForm } from "./CreatePersonal";
import { SmallContainer } from "../components/Container";
import { AppButtonSecondary, AppButtonDark } from "../components/AppButton";
import { Spinner } from "../components/Spinner";

// Redux
import { useSelector } from "react-redux";

// Api
import { getUser } from "../config/api";

export const EditPersonalView = (props) => {
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.user);
  const onSubmit = (data) => {
    console.log(data);
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
      <AppButtonSecondary onClick={(e) => setCreate(false)}>
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
      <CreatePersonalForm
        onSubmit={onSubmit}
        assistant={type === "assistants"}
        specialist={type === "specialists"}
      />
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
