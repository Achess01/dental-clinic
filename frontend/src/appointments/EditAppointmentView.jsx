import React, { useState, useEffect } from "react";

// Components
import { AppointmentForm as FormEdit } from "./AppointmentForm";
import { SmallContainer } from "../components/Container";
import { Spinner } from "../components/Spinner";
import { AppButtonDanger, AppButtonDark } from "../components/AppButton";

// Redux
import { useSelector } from "react-redux";

// Api
import { getAppointment, updateAppointment } from "../config/api";

import { useParams, useNavigate } from "react-router-dom";

export const EditAppointmentView = (props) => {
  const [loading, setLoading] = useState(false);
  const [appointmentData, setAppointmentData] = useState({});
  const { id } = useParams();
  const [patientInfo, setPatientInfo] = useState("");

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const onSubmit = async (data) => {
    const response = await updateAppointment({ id, token: user.token, data });
    if (!response) {
      alert("Error");
    } else {
      alert("Cita editada con éxito");
    }

    navigate(-1);
  };

  useEffect(() => {
    const appointmentFromApi = async () => {
      setLoading(true);
      const response = await getAppointment({ id, token: user.token });
      if (response !== null) {
        const date = response.date.replace("-06:00", "");
        const data = {
          date: date,
          specialist: response.specialist.id,
          patient: response.patient.id,
        };

        setPatientInfo(
          `${response.patient.rut} ${response.patient.first_name} ${response.patient.last_name}`
        );

        setAppointmentData(data);
      } else {
        return;
      }
      setLoading(false);
    };

    appointmentFromApi();
  }, []);

  const edit = () => (
    <>
      <h3>Editar cita</h3>
      <FormEdit
        onSubmit={onSubmit}
        values={appointmentData}
        user={user}
        info={patientInfo}
        edit
      />
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
