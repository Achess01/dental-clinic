/* 
  Diagnostic, Treatment and TretmentPerformed create and edit form
 */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// Components
import {
  AppButton,
  AppButtonDark,
  AppButtonSecondary,
} from "../components/AppButton";
import { AppInput, AppTextArea } from "../components/AppInput";
import { ErrorFieldForm as FormError } from "../components/ErrorFieldForm";

//Router
import { useNavigate } from "react-router-dom";

export const DiagnosticForm = (props) => {
  /* 
    This component accepts some custom props
    onSubmit: A function tha recieves an argument data
  
    edit: If the form is used to edit data
    values: An object with values for each field when editing
  */

  const navigate = useNavigate();

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
        name: "",
        description: "",
      });
    }
  }, [formState, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppInput
        label="Nombre *"
        type="text"
        register={register("name", {
          required: true,
          maxLength: 150,
        })}
      />
      {errors?.name?.type === "required" && (
        <FormError>Este campo es requerido</FormError>
      )}
      {errors?.name?.type === "maxLength" && (
        <FormError>Cantidad máxima de caracteres: 150</FormError>
      )}

      <AppTextArea
        label="Descripción *"
        register={register("description", {
          maxLength: 255,
          required: true,
        })}
      />
      {errors?.description?.type === "required" && (
        <FormError>Este campo es requerido</FormError>
      )}
      {errors?.description?.type === "maxLength" && (
        <FormError>Máximo de caracteres: 255</FormError>
      )}

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
  );
};
