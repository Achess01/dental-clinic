import React, { useState, useEffect } from "react";

// Router
import { Link } from "react-router-dom";

// Components
import { PatientForm } from "./PatientForm";
import { SmallContainer } from "../components/Container";
import { AppSelect } from "../components/AppInput";
import { AppButtonSecondary, AppButtonDark } from "../components/AppButton";
import { Spinner } from "../components/Spinner";
import { ErrorFieldForm } from "../components/ErrorFieldForm";

// Redux
import { useSelector } from "react-redux";

// Api
import { getPatients } from "../config/api";

export const PersonalView = (props) => {
  const [create, setCreate] = useState(false);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

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
    const allSpecialists = async () => {
      if (type === "assistants") {
        // Get all specialists
        setLoadingSignUp(true);
        const response = await getSpecialists(user.token);
        if (response) {
          setSpecialists(response);
        }
        setLoadingSignUp(false);
      }
    };

    allSpecialists();
  }, [type]);

  useEffect(() => {
    const patientsFromApi = async () => {
      setLoading(true);
      const response = await getPatients(user.token);
      if (response !== null) {
        setPatients(response);
      }
      setLoading(false);
    };

    patientsFromApi();
  }, [userData]);

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
        <PatientForm
          onSubmit={onSubmit}
          assistant={type === "assistants"}
          specialist={type === "specialists"}
          specialists={specialists}
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

  const TablePatients = (patients) => (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Rut</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Nombre</th>
          <th scope="col">Rol</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((u, index) => (
          <tr key={index} className={getColors(u)}>
            <th scope="row">{index + 1}</th>
            <td>{u.username}</td>
            <td>{u.phone_number}</td>
            <td>{`${u.first_name} ${u.last_name}`}</td>
            <td>{getRole(u)}</td>
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
        {loading ? <Spinner /> : TablePatients(patients)}
      </div>
    </SmallContainer>
  );
};
