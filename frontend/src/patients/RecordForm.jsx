/* 
  Record create and edit form
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

export const RecordForm = (props) => {
  /* 
    This component accepts some custom props
    onSubmit: A function tha recieves an argument data
      
    values: An object with values for each field when editing
    voucher_state: Para un voucher state por defecto
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
        attention_type: "", //select
        treatment: "", //select
        treated_piece: "", // textarea
        tretment_performed: "", //select
        diagnostic: "", // select
        indications: "", // textarea
        notes: "", // textarea
        attendance_state: "", //select
        voucher_state: "", // select
        surface: "", // select
      });
    }
  }, [formState, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppSelect
        label="Tipo de atención *"
        register={register("attention_type", {
          validate: (value) => value != -1,
        })}
      >
        <option value={-1}>----</option>
        {/* Add more options using API */}
      </AppSelect>
      {errors?.specialist?.type === "validate" && (
        <FormError>Elija una opción válida</FormError>
      )}

      <AppSelect
        label="Tratamiento *"
        register={register("treatment", {
          validate: (value) => value != -1,
        })}
      >
        <option value={-1}>----</option>
        {/* Add more options using API */}
      </AppSelect>
      {errors?.treatment?.type === "validate" && (
        <FormError>Elija una opción válida</FormError>
      )}

      <AppTextArea
        label="Pieza tratada"
        register={register("treated_piece", {
          maxLength: 255,
        })}
      />
      {errors?.treated_piece?.type === "maxLength" && (
        <FormError>Máximo de caracteres: 255</FormError>
      )}

      <AppSelect
        label="Superficie *"
        register={register("surface", {
          validate: (value) => value != -1,
        })}
      >
        <option value={-1}>----</option>
        {/* Add more options using API */}
      </AppSelect>
      {errors?.surface?.type === "validate" && (
        <FormError>Elija una opción válida</FormError>
      )}

      <AppSelect
        label="Tratamiento realizado *"
        register={register("tretment_performed", {
          validate: (value) => value != -1,
        })}
      >
        <option value={-1}>----</option>
        {/* Add more options using API */}
      </AppSelect>
      {errors?.tretment_performed?.type === "validate" && (
        <FormError>Elija una opción válida</FormError>
      )}

      <AppSelect
        label="Diagnóstico *"
        register={register("diagnostic", {
          validate: (value) => value != -1,
        })}
      >
        <option value={-1}>----</option>
        {/* Add more options using API */}
      </AppSelect>
      {errors?.diagnostic?.type === "validate" && (
        <FormError>Elija una opción válida</FormError>
      )}

      <AppTextArea
        label="Indicaciones"
        register={register("indications", {
          maxLength: 255,
        })}
      />
      {errors?.indications?.type === "maxLength" && (
        <FormError>Máximo de caracteres: 255</FormError>
      )}

      <AppTextArea
        label="Obseravciones"
        register={register("notes", {
          maxLength: 255,
        })}
      />
      {errors?.notes?.type === "maxLength" && (
        <FormError>Máximo de caracteres: 255</FormError>
      )}

      <AppSelect
        label="Asistencia *"
        register={register("attendance_state", {
          validate: (value) => value != -1,
        })}
      >
        <option value={-1}>----</option>
        {/* Add more options using API */}
      </AppSelect>
      {errors?.attendance_state?.type === "validate" && (
        <FormError>Elija una opción válida</FormError>
      )}

      <AppSelect
        label="Estado de la boleta *"
        register={register("voucher_state", {
          validate: (value) => value != -1,
        })}
      >
        <option value={-1}>----</option>
        {/* Add more options using API */}
      </AppSelect>
      {errors?.voucher_state?.type === "validate" && (
        <FormError>Elija una opción válida</FormError>
      )}

      <AppButton type="submit">Registrar</AppButton>
    </form>
  );
};
