import React, { useState, useEffect } from "react";

// Router
import { Link } from "react-router-dom";

// Components
import { PatientForm } from "./PatientForm";
import { SmallContainer } from "../components/Container";
import { AppButtonSecondary, AppButtonDark } from "../components/AppButton";
import { Spinner } from "../components/Spinner";
import { ErrorFieldForm } from "../components/ErrorFieldForm";

// Redux
import { useSelector } from "react-redux";

// Api
import { getPatients, signUpPatient } from "../config/api";

// Router
import { useNavigate } from "react-router-dom";

export const PatientView = (props) => {
  const [create, setCreate] = useState(false);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);

  const [error, setError] = useState(false);

  const [fetch, setFetch] = useState(false);

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const onSubmit = async (data) => {
    setLoadingSignUp(true);
    const response = await signUpPatient({ data, token: user.token });
    setLoadingSignUp(false);
    if (!response) {
      setError(true);
    } else {
      setError(false);
    }
  };

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
  }, [fetch]);

  const createForm = () => (
    <>
      <AppButtonSecondary
        onClick={(e) => {
          setCreate(false);
          setError(false);
        }}
      >
        <i className="bi bi-chevron-up"></i>
      </AppButtonSecondary>
      <h3>Agregar pacientes</h3>
      {loadingSignUp ? <Spinner /> : <PatientForm onSubmit={onSubmit} />}
      {error && (
        <ErrorFieldForm>
          Error al crear el paciente, verifique que el rut no sea repetido
        </ErrorFieldForm>
      )}
    </>
  );

  const table = (patients) => (
    <table className="table mt-5">
      <thead>
        <tr>
          <th scope="col">
            <AppButtonDark onClick={(e) => setFetch(!fetch)}>
              <i className="bi bi-arrow-repeat"></i>
            </AppButtonDark>
          </th>
        </tr>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Rut</th>
          <th scope="col">Nombre</th>
          <th scope="col">Nacimiento</th>
          <th scope="col">Edad</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((u, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{u.rut}</td>
            <td>{`${u.first_name} ${u.last_name}`}</td>
            <td>{u.birthday}</td>
            <td>{u.age}</td>
            {(user.is_admin || user.is_staff) && (
              <td>
                <Link to={u.rut}>Editar</Link>
              </td>
            )}
            <td>
              <Link to={`${u.rut}/records`}>records</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <SmallContainer>
      <div className="d-flex flex-column align-items-center justify-content-center m-5">
        <h1 className="m-5">Pacientes</h1>
        {user.is_secretary && (
          <AppButtonDark onClick={(e) => setCreate(true)}>
            <i className="bi bi-file-earmark-plus-fill">Nuevo</i>
          </AppButtonDark>
        )}
        {create && createForm()}
        {loading ? <Spinner /> : table(patients)}
      </div>
    </SmallContainer>
  );
};
