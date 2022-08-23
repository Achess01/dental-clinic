import React, { useState, useEffect } from "react";

// Router
import { Link } from "react-router-dom";

// Components

import { SmallContainer } from "../components/Container";
import { AppButtonDark, AppButtonLink } from "../components/AppButton";
import { Spinner } from "../components/Spinner";
import { AppInput, AppSelect } from "../components/AppInput";

// Redux
import { useSelector } from "react-redux";

// Api
import { getAppointments } from "../config/api";

// Form
import { useForm } from "react-hook-form";

export const SpecialistAppointmentsView = (props) => {
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
    },
  });

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [fetch, setFetch] = useState(false);

  const user = useSelector((state) => state.user.user);

  const resetValues = () => {
    reset({
      // start: currentDateTime.toLocaleString().replace("-06:00", ""),
      start: localISOTime,
      end: "",
    });
    setFetch(!fetch);
  };

  /* Get all appointments */
  useEffect(() => {
    const appointmentsFromApi = async () => {
      setLoading(true);
      const params = {
        specialist: user.profile.id,
      };
      Object.entries(getValues()).forEach((p) => {
        if (p[1] !== "") {
          params[p[0]] = p[1];
        }
      });
      const response = await getAppointments(user.token, params);
      if (response !== null) {
        setAppointments(response);
      }
      setLoading(false);
    };

    appointmentsFromApi();
  }, [fetch]);

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

      {/* <AppSelect label="especialista" register={register("specialist")}>
        <option value="">----</option>
        {specialists.map((s, index) => (
          <option key={index} value={s.profile.id}>
            {s.username} {s.first_name} {s.last_name}
          </option>
        ))}
      </AppSelect> */}
      <AppButtonDark type="submit">
        <i className="bi bi-search">Buscar</i>
      </AppButtonDark>

      <AppButtonDark type="button" onClick={resetValues}>
        <i className="bi bi-eraser"></i>
      </AppButtonDark>
    </form>
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
