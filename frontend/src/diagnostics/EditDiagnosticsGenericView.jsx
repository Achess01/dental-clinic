import React, { useState, useEffect } from "react";

// Components
import { DiagnosticForm as FormEdit } from "./CreateDiagnosticsForm";
import { SmallContainer } from "../components/Container";
import { Spinner } from "../components/Spinner";

// Redux
import { useSelector } from "react-redux";

// Api
import { getGeneric, updateGeneric } from "../config/api";

import { useParams, useNavigate } from "react-router-dom";

export const EditDiagnosticsGenericView = (props) => {
  const [loading, setLoading] = useState(false);
  const [choiceData, setChoiceData] = useState({});
  const { id } = useParams();
  const path = props.path || "";

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const onSubmit = async (data) => {
    const response = await updateGeneric({ id, token: user.token, data, path });
    if (!response) {
      alert("Error");
    } else {
      alert("Editado con éxito");
    }

    navigate(-1);
  };

  useEffect(() => {
    const getFromApi = async () => {
      setLoading(true);
      const response = await getGeneric({ id, token: user.token, path });
      if (response !== null) {
        setChoiceData(response);
      } else {
        return;
      }
      setLoading(false);
    };

    getFromApi();
  }, []);

  const edit = () => (
    <>
      <h3>Editar {props.text}</h3>
      <FormEdit onSubmit={onSubmit} values={choiceData} edit />
    </>
  );

  return (
    <SmallContainer>
      <div className="d-flex flex-column align-items-center justify-content-center m-5">
        {loading ? <Spinner /> : edit()}
      </div>
    </SmallContainer>
  );
};
