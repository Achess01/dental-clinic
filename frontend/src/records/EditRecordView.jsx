import React, { useState, useEffect } from "react";

// Components
import { SmallContainer } from "../components/Container";
import { RecordForm } from "./RecordForm";
import { Spinner } from "../components/Spinner";
import { AppButtonDark } from "../components/AppButton";

// API
import { getRecord, updateRecord } from "../config/api";

// Redux
import { useSelector } from "react-redux";

// Router
import { useParams, useNavigate } from "react-router-dom";

export const EditRecordView = (props) => {
  const [record, setRecord] = useState({});
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const getRecordAPI = async () => {
      setLoading(true);
      const response = await getRecord({ id, token: user.token });
      if (response) {
        const patientResponse = response.appointment.patient;
        const data = {
          attention_type: response.attention_type,
          treatment: response.treatment ? response.treatment.id : "",
          treated_piece: response.treated_piece
            ? response.treated_piece.id
            : "",
          tretment_performed: response.tretment_performed,
          diagnostic: response.diagnostic ? response.diagnostic.id : "",
          indications: response.indications,
          notes: response.notes,
          attendance_state: response.attendance_state,
          voucher_state: response.voucher_state,
          surface: response.surface,
        };
        setPatient(
          `${patientResponse.rut} ${patientResponse.first_name} ${patientResponse.last_name}`
        );
        setRecord(data);
      }
      setLoading(false);
    };

    getRecordAPI();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await updateRecord({ id, token: user.token, data });
    if (response) {
      alert("Actualizado con éxito");
    } else {
      alert("Error");
    }
    setLoading(false);
    navigate(-1);
  };

  return (
    <SmallContainer>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <AppButtonDark onClick={(e) => navigate(-1)}>
          <i className="bi bi-door-open">Regresar</i>
        </AppButtonDark>
        <div className="my-5">
          <h1>Ficha clínica</h1>
          <i>{patient}</i>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <RecordForm onSubmit={onSubmit} values={record} />
        )}
      </div>
    </SmallContainer>
  );
};
