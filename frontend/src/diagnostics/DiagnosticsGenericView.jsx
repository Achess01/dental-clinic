import React, { useState, useEffect } from "react";

// Router
import { Link } from "react-router-dom";

// Components
import { DiagnosticForm } from "./CreateDiagnosticsForm";
import { SmallContainer } from "../components/Container";
import { AppButtonSecondary, AppButtonDark } from "../components/AppButton";
import { Spinner } from "../components/Spinner";
import { ErrorFieldForm } from "../components/ErrorFieldForm";

// Redux
import { useSelector } from "react-redux";

// Api
import { getAllGeneric, signUpGeneric } from "../config/api";

export const DiagnosticsGenericView = (props) => {
  const [create, setCreate] = useState(false);
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);

  const path = props.path || "";

  const [error, setError] = useState(false);

  const [fetch, setFetch] = useState(false);

  const user = useSelector((state) => state.user.user);

  const onSubmit = async (data) => {
    setLoadingSignUp(true);
    const response = await signUpGeneric({ data, token: user.token, path });
    setLoadingSignUp(false);
    if (!response) {
      setError(true);
    } else {
      setError(false);
      alert("Creado");
    }
  };

  /* Get all  */
  useEffect(() => {
    const getFromApi = async () => {
      setLoading(true);
      const response = await getAllGeneric({ token: user.token, path });
      if (response !== null) {
        setChoices(response);
      }
      setLoading(false);
    };

    getFromApi();
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
      <h3>Crear</h3>
      {loadingSignUp ? <Spinner /> : <DiagnosticForm onSubmit={onSubmit} />}
      {error && <ErrorFieldForm>Error al crear</ErrorFieldForm>}
    </>
  );

  const table = (choices) => (
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
          <th scope="col">Nombre</th>
          <th scope="col">Descripción</th>
        </tr>
      </thead>
      <tbody>
        {choices.map((c, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{c.name}</td>
            <td>{c.description}</td>
            <td>
              <Link to={`${c.id}/`}>Editar</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <SmallContainer>
      <div className="d-flex flex-column align-items-center justify-content-center m-5">
        <h1 className="m-5">{props.text}</h1>
        <AppButtonDark onClick={(e) => setCreate(true)}>
          <i className="bi bi-file-earmark-plus-fill">Crear</i>
        </AppButtonDark>
        {create && createForm()}
        {loading ? <Spinner /> : table(choices)}
      </div>
    </SmallContainer>
  );
};
