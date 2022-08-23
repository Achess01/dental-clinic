/* 
  Form component to create and edit an appointment
 */

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// Components
import {
  AppButton,
  AppButtonDark,
  AppButtonSecondary,
  AppButtonLink,
} from "../components/AppButton";
import { AppCheckbox, AppInput, AppSelect } from "../components/AppInput";
import { ErrorFieldForm as FormError } from "../components/ErrorFieldForm";
import { Spinner } from "../components/Spinner";
import { getPatients } from "../config/api";

// Router
import { useNavigate } from "react-router";

//Api
import { getSpecialists } from "../config/api";

export const AppointmentForm = (props) => {
  /* 
  This component accepts some custom props
  onSubmit: A function tha recieves an argument data
  specialists: Specialists to show in select input

  edit: If the form is used to edit data
  values: An object with values for each field when editing  
*/
  const [patientInfo, setPatientInfo] = useState(props.info || "");
  const [loading, setLoading] = useState(false);
  const [querySearch, setQuerySearch] = useState("");
  const [patients, setPatients] = useState([]);

  const navigate = useNavigate();

  const [specialists, setSpecialists] = useState([]);
  const user = props.user || {};

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors, isSubmitSuccessful }, //Reset values
    reset,
    setValue,
  } = useForm();

  /* If a submit function is not provided */
  const onSubmit = props.onSubmit || function (data) {};

  const setValues = () => {
    if (props.values) {
      let vals = Object.entries(props.values);
      for (let val of vals) {
        setValue(val[0], val[1]);
      }
    }
  };

  /* Update field values */
  useEffect(() => {
    setValues();
  }, [props.values, specialists]);

  useEffect(() => {
    /* Reset form when submit is succesful*/
    if (formState.isSubmitSuccessful) {
      reset({
        date: "",
        specialist: "",
        patient: "",
      });
    }
  }, [formState, reset]);

  const searchPatients = async () => {
    const params = {
      search: querySearch,
    };
    const response = await getPatients(user.token, params);
    if (response) {
      setPatients(response);
    }
  };

  /* Get all specialists */
  useEffect(() => {
    const allSpecialists = async () => {
      // Get all specialists
      const response = await getSpecialists(user.token);
      if (response) {
        setSpecialists(response);
      }
    };

    allSpecialists();
  }, []);

  return (
    <>
      {!props.edit && (
        <div className="d-flex flex-column align-items-start justify-content-center">
          <div className="d-flex">
            <AppInput
              label="Buscar paciente"
              type="text"
              onChange={(e) => setQuerySearch(e.target.value)}
              onBlur={(e) => setQuerySearch(e.target.value)}
              value={querySearch}
            />
            <AppButtonDark type="button" onClick={searchPatients}>
              Buscar
            </AppButtonDark>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center">
              {patients.length > 0 ? (
                <div className="card">
                  <ul className="list-group list-group-flush">
                    {patients.map((p, index) => (
                      <li
                        className="d-flex align-items-center list-group-item"
                        key={index}
                      >
                        <p className="m-0">
                          {p.rut} {p.first_name} {p.last_name}
                        </p>
                        <AppButtonLink
                          type="button"
                          onClick={(e) => {
                            setValue("patient", p.id);
                            setPatientInfo(
                              `${p.rut} ${p.first_name} ${p.last_name}`
                            );
                          }}
                        >
                          Elegir
                        </AppButtonLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No hay pacientes</p>
              )}
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <AppInput
          hidden
          readOnly
          type="text"
          register={register("patient", {
            required: true,
          })}
        />

        <AppInput readOnly label="Paciente" type="text" value={patientInfo} />
        {errors?.patient?.type === "required" && (
          <FormError>Se necesita un paciente</FormError>
        )}

        <AppInput
          label="Fecha y hora *"
          type="datetime-local"
          register={register("date", {
            required: true,
          })}
        />
        {errors?.rut?.type === "required" && (
          <FormError>Este campo es requerido</FormError>
        )}

        <AppSelect
          disabled={props.edit ? true : false}
          label="Especialista *"
          register={register("specialist", {
            validate: (value) => value != -1,
          })}
        >
          <option value={-1}>----</option>
          {/* Add options from api */}
          {specialists.map((s, index) => (
            <option key={index} value={s.profile.id}>
              {s.username} {s.first_name} {s.last_name} {s.profile.speciality}
            </option>
          ))}
        </AppSelect>
        {errors?.specialist?.type === "validate" && (
          <FormError>Elija una opción válida</FormError>
        )}

        <AppCheckbox
          label="Pagado"
          hidden={props.edit ? true : false}
          register={register("paid")}
        />

        {props.edit ? (
          <>
            <AppButtonSecondary type="submit">Editar</AppButtonSecondary>
            <AppButtonDark type="button" onClick={(e) => navigate(-1)}>
              <i className="bi bi-door-open"></i>
            </AppButtonDark>
          </>
        ) : (
          <AppButton type="submit">Registrar</AppButton>
        )}
      </form>
    </>
  );
};
