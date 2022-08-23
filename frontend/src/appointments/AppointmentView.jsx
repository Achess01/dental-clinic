import React, { useState, useEffect } from "react";

// Router
import { Link } from "react-router-dom";

// Components
import { AppointmentForm } from "./AppointmentForm";
import { SmallContainer } from "../components/Container";
import { AppButtonSecondary, AppButtonDark } from "../components/AppButton";
import { Spinner } from "../components/Spinner";
import { ErrorFieldForm } from "../components/ErrorFieldForm";
import { AppInput, AppSelect } from "../components/AppInput";

// Redux
import { useSelector } from "react-redux";

// Api
import {
  getAppointments,
  signUpAppointment,
  getSpecialists,
} from "../config/api";

// Form
import { useForm } from "react-hook-form";

export const AppointmentView = (props) => {
  // Now - 30 minutes
  const currentDateTime = new Date(Date.now() - 60000 * 30);
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(currentDateTime - tzoffset)
    .toISOString()
    .slice(0, -8);

  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: {
      // start: currentDateTime.toLocaleString().replace("-06:00", ""),
      start: localISOTime,
      end: "",
      specialist: "",
    },
  });

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

  const resetValues = () => {
    reset({
      // start: currentDateTime.toLocaleString().replace("-06:00", ""),
      start: localISOTime,
      end: "",
      specialist: "",
    });
    setFetch(!fetch);
  };

  /* Get all appointments */
  useEffect(() => {
    const appointmentsFromApi = async () => {
      setLoading(true);
      const params = {};
      Object.entries(getValues()).forEach((p) => {
        if (p[1] !== "") {
          params[p[0]] = p[1];
        }
      });

      const response = await getAppointments(user.token, params);
      const specialistsResponse = await getSpecialists(user.token);
      if (response !== null) {
        setAppointments(response);
      }
      if (specialistsResponse) setSpecialists(specialistsResponse);
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

  const searchForm = () => (
    <form
      onSubmit={handleSubmit(() => {
        setFetch(!fetch);
      })}
      className="mt-5"
    >
      <AppInput
        type="datetime-local"
        label="desde"
        register={register("start")}
      />

      <AppInput
        type="datetime-local"
        label="hasta"
        register={register("end")}
      />

      <AppSelect label="especialista" register={register("specialist")}>
        <option value="">----</option>
        {specialists.map((s, index) => (
          <option key={index} value={s.profile.id}>
            {s.username} {s.first_name} {s.last_name}
          </option>
        ))}
      </AppSelect>
      <AppButtonDark type="submit">
        <i className="bi bi-search">Buscar</i>
      </AppButtonDark>

      <AppButtonDark type="button" onClick={resetValues}>
        <i className="bi bi-eraser"></i>
      </AppButtonDark>
    </form>
  );

  const table = (appointments) => (
    <table className="table">
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
        {loading ? (
          <Spinner />
        ) : (
          <>
            {searchForm()} {table(appointments)}
          </>
        )}
      </div>
    </SmallContainer>
  );
};
