import React from "react";

export const RecordCard = ({ record }) => {
  const appointment = record.appointment;
  const patient = appointment.patient;
  const specialist = appointment.specialist;
  const secretary = appointment.secretary;
  const date = new Date(appointment.date);

  return (
    <div className="card m-2">
      <div className="card-body">
        <h5 className="card-title">Ficha médica {patient.rut}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {record.voucher_state}
        </h6>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Paciente: {patient.rut} {patient.first_name} {patient.last_name}
          </li>
          <li className="list-group-item">
            Especialista : {specialist.user.username}{" "}
            {specialist.user.first_name} {specialist.user.last_name} (
            {specialist.speciality})
          </li>
          <li className="list-group-item">Fecha: {date.toLocaleString()}</li>
          <li className="list-group-item text-muted">
            Registrado por: {secretary.user.username}{" "}
            {secretary.user.first_name} {secretary.user.last_name}
          </li>
          <li className="list-group-item ">
            Asistencia: {record.attendance_state}
          </li>
          <li className="list-group-item ">
            Indicaciones: {record.indications}
          </li>
          <li className="list-group-item ">Observaciones: {record.notes}</li>
          <li className="list-group-item ">Superficie: {record.surface}</li>
          <li className="list-group-item ">
            Pieza tratada: {record.treated_piece}
          </li>
        </ul>
      </div>
    </div>
  );
};
