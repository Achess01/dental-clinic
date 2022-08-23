import React, { useState, useEffect } from "react";

// Router
import { Link } from "react-router-dom";

// Components

import { SmallContainer } from "../components/Container";
import { AppButtonDark, AppButtonLink } from "../components/AppButton";
import { Spinner } from "../components/Spinner";

// Redux
import { useSelector } from "react-redux";

// Api
import { getAppointments } from "../config/api";

export const SpecialistAppointmentsView = (props) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [fetch, setFetch] = useState(false);

  const user = useSelector((state) => state.user.user);

  /* Get all appointments */
  useEffect(() => {
    const appointmentsFromApi = async () => {
      setLoading(true);
      const params = {
        specialist: user.profile.id,
      };
      const response = await getAppointments(user.token, params);
      if (response !== null) {
        setAppointments(response);
      }
      setLoading(false);
    };

    appointmentsFromApi();
  }, [fetch]);

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
              <Link to={`../patients/${a.patient.rut}/records`}>Records</Link>
            </td>
            <td>
              {a.specialist.user.username} {a.specialist.user.first_name}{" "}
              {a.specialist.user.last_name} ({a.specialist.speciality})
            </td>
            <td>
              <Link to={`${a.id}/record`}>Ficha clínica</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <SmallContainer>
      <div className="d-flex flex-column align-items-center justify-content-center m-5">
        <h1 className="">Mis citas</h1>
        {loading ? <Spinner /> : table(appointments)}
      </div>
    </SmallContainer>
  );
};
