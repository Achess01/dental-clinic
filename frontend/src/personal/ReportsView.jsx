import React, { useState, useEffect } from "react";

// Router
import { Link } from "react-router-dom";

// Components
import { SmallContainer } from "../components/Container";
import { AppButtonSecondary, AppButtonDark } from "../components/AppButton";
import { Spinner } from "../components/Spinner";
import { ErrorFieldForm } from "../components/ErrorFieldForm";
import { AppInput, AppSelect } from "../components/AppInput";

// Redux
import { useSelector } from "react-redux";

// Api
import {
  getRecords,
  getLateRecords,
  getNoAttendedRecords,
  getSpecialists,
  getPatients,
} from "../config/api";

// Form
import { useForm } from "react-hook-form";

export const ReportsView = (props) => {
  const defaultValues = {
    // start: currentDateTime.toLocaleString().replace("-06:00", ""),
    start: "",
    end: "",
    specialist: "",
    patient: "",
  };

  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues,
  });

  const [loading, setLoading] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [specialists, setSpecialists] = useState([]);
  const [patients, setPatients] = useState([]);
  const [total, setTotal] = useState(0);
  const [attended, setAttended] = useState(0);
  const [late, setLate] = useState(0);
  const [noAttended, setNoAttended] = useState(0);

  const [fetch, setFetch] = useState(false);

  const user = useSelector((state) => state.user.user);

  const resetValues = () => {
    reset(defaultValues);
    setFetch(!fetch);
  };

  /* Get specialists and patients */
  useEffect(() => {
    const token = user.token
    const getPatientsSpecialists = async () => {
      setLoading(true);
      const specialistsResponse = await getSpecialists(token);
      const patientsResponse = await getPatients(token);
      if (specialistsResponse) setSpecialists(specialistsResponse);
      if (patientsResponse) setPatients(patientsResponse);
      setLoading(false);
    };

    getPatientsSpecialists();
  }, []);

  /* Get all  */
  useEffect(() => {
    const doGetFromApi = async () => {
      setLoading(true);
      const token = user.token;
      const params = {};
      Object.entries(getValues()).forEach((p) => {
        if (p[1] !== "") {
          params[p[0]] = p[1];
        }
      });

      const records = await getRecords({
        token,
        params: {
          ...params,
          attendance_state: "A",
        },
      });

      const lateRecords = await getLateRecords({ token, params });
      const noAttendedRecords = await getNoAttendedRecords({ token, params });

      let total = 0;
      if (records) {
        setAttended(records.length);
        total += records.length;
      }

      if (lateRecords) {
        setLate(lateRecords.length);
        total += lateRecords.length;
      }

      if (noAttendedRecords) {
        setNoAttended(noAttendedRecords.length);
        total += noAttendedRecords.length;
      }

      setTotal(total);
      setLoading(false);
    };

    doGetFromApi();
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

      <AppSelect label="especialista" register={register("specialist")}>
        <option value="">----</option>
        {specialists.map((s, index) => (
          <option key={index} value={s.username}>
            {s.username} {s.first_name} {s.last_name}
          </option>
        ))}
      </AppSelect>

      <AppSelect label="paciente" register={register("patient")}>
        <option value="">----</option>
        {patients.map((s, index) => (
          <option key={index} value={s.rut}>
            {s.rut} {s.first_name} {s.last_name}
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

  const table = () => (
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
          <th scope="col">Atendidos</th>
          <th scope="col">Tarde</th>
          <th scope="col">No atendidos</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="col">{attended}</th>
          <th scope="col">{late}</th>
          <th scope="col">{noAttended}</th>
          <th scope="col">{total}</th>
        </tr>
      </tbody>
    </table>
  );

  return (
    <SmallContainer>
      <div className="d-flex flex-column align-items-center justify-content-center m-5">
        <h1 className="m-5">Reportes</h1>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {searchForm()} {table()}
          </>
        )}
      </div>
    </SmallContainer>
  );
};
