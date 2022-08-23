import React, { useState, useEffect } from "react";

// Router
import { Link } from "react-router-dom";

// Components
import { AppointmentForm } from "./AppointmentForm";
import { SmallContainer } from "../components/Container";
import { AppButtonSecondary, AppButtonDark } from "../components/AppButton";
import { Spinner } from "../components/Spinner";
import { ErrorFieldForm } from "../components/ErrorFieldForm";

// Redux
import { useSelector } from "react-redux";

// Api
import { getAppointments, signUpAppointment } from "../config/api";

export const AppointmentView = (props) => {
  const [create, setCreate] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [specialists, setSpecialists] = useState([]);

  const [error, setError] = useState(false);

  const [fetch, setFetch] = useState(false);

  const user = useSelector((state) => state.user.user);

  const onSubmit = async (data) => {
    setLoadingSignUp(true);
    const response = await signUpAppointment({ data, token: user.token });
    setLoadingSignUp(false);
    if (!response) {
      setError(true);
    } else {
      setError(false);
      alert("Cita creada");
    }
  };

  /* Get all appointments */
  useEffect(() => {
    const appointmentsFromApi = async () => {
      setLoading(true);
      const response = await getAppointments(user.token);
      if (response !== null) {
        setAppointments(response);
      }
      setLoading(false);
    };

    appointmentsFromApi();
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
      <h3>Crear cita</h3>
      {loadingSignUp ? (
        <Spinner />
      ) : (
        <AppointmentForm onSubmit={onSubmit} user={user} />
      )}
      {error && <ErrorFieldForm>Error al crear la cita</ErrorFieldForm>}
    </>
  );

  const table = (appointments) => (
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
          <th scope="col">Fecha</th>
          <th scope="col">Paciente</th>
          <th scope="col">Especialista</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((a, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{new Date(a.date).toLocaleString()}</td>
            <td>
              {a.patient.rut} {a.patient.first_name} {a.patient.last_name}
            </td>
            <td>
              {a.specialist.user.username} {a.specialist.user.first_name}{" "}
              {a.specialist.user.last_name} ({a.specialist.speciality})
            </td>
            {user.is_secretary && (
              <td>
                <Link to={`${a.id}/`}>Editar</Link>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <SmallContainer>
      <div className="d-flex flex-column align-items-center justify-content-center m-5">
        <h1 className="m-5">Citas</h1>
        {user.is_secretary && (
          <AppButtonDark onClick={(e) => setCreate(true)}>
            <i className="bi bi-file-earmark-plus-fill">Nueva cita</i>
          </AppButtonDark>
        )}
        {create && createForm()}
        {loading ? <Spinner /> : table(appointments)}
      </div>
    </SmallContainer>
  );
};
