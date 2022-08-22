import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// Components
import {
  AppButton,
  AppButtonDark,
  AppButtonSecondary,
} from "../components/AppButton";
import { AppInput, AppSelect } from "../components/AppInput";
import { ErrorFieldForm as FormError } from "../components/ErrorFieldForm";

import { useNavigate } from "react-router-dom";

export const CreatePersonalForm = (props) => {
  /* 
  This component accepts some custom props
  onSubmit: A function tha recieves an argument data
  assistant: Boolean to add extra fields for assistants
  specialist: Boolean to add extra fields for assistans

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

  const navigate = useNavigate();

  const onSubmit = props.onSubmit || function (data) {};
  const specialists = props.specialists || [];

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
        username: "",
        phone_number: "",
        first_name: "",
        second_name: "",
        last_name: "",
        last_mother_name: "",
        specialist: -1,
        speciality: "",
      });
    }
  }, [formState, reset]);

  const specialistFields = () => (
    <>
      <AppInput
        label="Especialidad *"
        type="text"
        register={register("speciality", {
          maxLength: 150,
          required: true,
        })}
      />
      {errors?.speciality?.type === "required" && (
        <FormError>Este campo es requerido</FormError>
      )}
      {errors?.speciality?.type === "maxLength" && (
        <FormError>Máximo de caracteres: 150</FormError>
      )}
    </>
  );

  const assistantFields = () => (
    <>
      <AppSelect
        label="Especialista *"
        type="text"
        register={register("specialist", {
          validate: (value) => value != -1,
        })}
      >
        <option value={-1}>----</option>
        {specialists.map((s, index) => (
          <option value={s.profile.id} key={index}>
            {s.username} - {s.first_name} {s.last_name} - {s.profile.speciality}
          </option>
        ))}
        {/* Add options from api */}
      </AppSelect>
      {errors?.specialist?.type === "validate" && (
        <FormError>Elija una opción válida</FormError>
      )}
    </>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppInput
        label="Rut (DPI/Pasaporte) *"
        type="text"
        register={register("username", {
          pattern: /^[a-zA-Z0-9]{9,13}$/,
          required: true,
        })}
      />
      {errors?.username?.type === "required" && (
        <FormError>Este campo es requerido</FormError>
      )}
      {errors?.username?.type === "pattern" && (
        <FormError>Solo dígitos y letras permitidas min: 9, max:13</FormError>
      )}

      <AppInput
        label="Número de teléfono *"
        type="text"
        register={register("phone_number", {
          pattern: /^\+?1?\d{9,15}$/,
          required: true,
        })}
      />
      {errors?.phone_number?.type === "required" && (
        <FormError>Este campo es requerido</FormError>
      )}
      {errors?.phone_number?.type === "pattern" && (
        <FormError>Ingrese un número telefónico válido</FormError>
      )}

      <AppInput
        label="Primer nombre *"
        type="text"
        register={register("first_name", {
          maxLength: 150,
          required: true,
        })}
      />
      {errors?.first_name?.type === "required" && (
        <FormError>Este campo es requerido</FormError>
      )}
      {errors?.first_name?.type === "maxLength" && (
        <FormError>Máximo de caracteres: 150</FormError>
      )}

      <AppInput
        label="Segundo nombre"
        type="text"
        register={register("second_name", {
          maxLength: 150,
        })}
      />
      {errors?.second_name?.type === "maxLength" && (
        <FormError>Máximo de caracteres: 150</FormError>
      )}

      <AppInput
        label="Primer apellido *"
        type="text"
        register={register("last_name", {
          maxLength: 150,
          required: true,
        })}
      />
      {errors?.last_name?.type === "required" && (
        <FormError>Este campo es requerido</FormError>
      )}
      {errors?.last_name?.type === "maxLength" && (
        <FormError>Máximo de caracteres: 150</FormError>
      )}

      <AppInput
        label="Segundo apellido"
        type="text"
        register={register("last_mother_name", {
          maxLength: 150,
        })}
      />
      {errors?.last_mother_name?.type === "required" && (
        <FormError>Este campo es requerido</FormError>
      )}
      {errors?.last_mother_name?.type === "maxLength" && (
        <FormError>Máximo de caracteres: 150</FormError>
      )}
      {props.specialist && !props.edit ? specialistFields() : <></>}
      {props.assistant && !props.edit ? assistantFields() : <></>}

      {props.edit ? (
        <>
          <AppButtonSecondary type="submit">Editar</AppButtonSecondary>
          <AppButtonDark type="button" onClick={(e) => navigate(-1)}>
            <i class="bi bi-door-open"></i>
          </AppButtonDark>
        </>
      ) : (
        <AppButton type="submit">Registrar</AppButton>
      )}
    </form>
  );
};
