import React, { useState, useEffect } from "react";

// Components
import { PatientForm as FormEdit} from "./PatientForm";
import { SmallContainer } from "../components/Container";
import { Spinner } from "../components/Spinner";
import { AppButtonDanger, AppButtonDark } from "../components/AppButton";

// Redux
import { useSelector } from "react-redux";

// Api
import { getPatient, updatePatient, deletePatient } from "../config/api";

import { useParams, useNavigate } from "react-router-dom";

export const EditPatientView = (props) => {
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const onSubmit = async (data) => {
    const response = await updatePatient({ id, token: user.token, data });
    if (!response) {
      alert("Error");
    } else {
      alert("Paciente editado con éxito");
    }

    navigate(-1);
  };

  const doDelete = async (e) => {
    let choice = confirm("¿Desea ELIMINAR este usuario?");
    if (choice) {
      const response = await deletePatient({ id, token: user.token });
      if (!response) {
        alert("Error");
      } else {
        alert(`Paciente eliminado`);
        navigate(-1);
      }
    }
  };

  useEffect(() => {
    const userFromApi = async () => {
      setLoading(true);
      const response = await getPatient({ id, token: user.token });
      if (response !== null) {
        setPatientData(response);
      } else {
        return;
      }
      setLoading(false);
    };

    userFromApi();
  }, []);

  const edit = () => (
    <>
      <h3>Editar paciente</h3>
      <div className="m-3">
        <AppButtonDanger onClick={doDelete}>Eliminar</AppButtonDanger>
      </div>
      <FormEdit onSubmit={onSubmit} values={patientData} edit />
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
