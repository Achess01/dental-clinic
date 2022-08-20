/* 
  Form component to create and edit an appointment
 */

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// Components
import {
  AppButton,
  AppButtonDark,
  AppButtonSecondary,
} from "../components/AppButton";
import { AppInput, AppSelect, AppTextArea } from "../components/AppInput";
import { ErrorFieldForm as FormError } from "../components/ErrorFieldForm";

export const AppointmentForm = (props) => {
  /* 
  This component accepts some custom props
  onSubmit: A function tha recieves an argument data

  edit: If the form is used to edit data
  values: An object with values for each field when editing
*/

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors, isSubmitSuccessful }, //Reset values
    reset,
    setValue,
  } = useForm();

  /* If a submit function is not provided */
  const onSubmit =
    props.onSubmit ||
    function (data) {
      console.log(data);
    };

  /* Update field values */
  useEffect(() => {
    if (props.values) {
      let vals = Object.entries(props.values);
      for (let val of vals) {
        setValue(val[0], val[1]);
      }
    }
  }, [props.values]);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppInput
        label="Fecha y hora"
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
        <option value={1}>Hola</option>
        {/* Add options from api */}
      </AppSelect>
      {errors?.specialist?.type === "validate" && (
        <FormError>Elija una opción válida</FormError>
      )}

      {!props.edit ? (
        <div className="d-flex align-items-start">
          <AppInput label="Buscar paciente" type="text" />
          <AppButtonDark type="button">Buscar</AppButtonDark>
        </div>
      ) : (
        <></>
      )}
      {props.edit ? (
        <>
          <AppButtonSecondary type="submit">Editar</AppButtonSecondary>
          <AppButtonDark type="button">Cancelar</AppButtonDark>
        </>
      ) : (
        <AppButton type="submit">Registrar</AppButton>
      )}
    </form>
  );
};
