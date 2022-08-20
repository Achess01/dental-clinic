/* 
  Patient create and edit form
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

export const PatientForm = (props) => {
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
        rut: "",
        first_name: "",
        last_name: "",
        birthday: "",
        age: "",
        occupation: "",
        address: "",
        medical_history: "",
      });
    }
  }, [formState, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppInput
        readOnly={props.edit ? true : false}
        label="Rut (DPI/Pasaporte) *"
        type="text"
        register={register("rut", {
          pattern: /^[a-zA-Z0-9]{9,13}$/,
          required: true,
        })}
      />
      {errors?.rut?.type === "required" && (
        <FormError>Este campo es requerido</FormError>
      )}
      {errors?.rut?.type === "pattern" && (
        <FormError>Solo dígitos y letras permitidas min: 9, max:13</FormError>
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
        label="Fecha de nacimiento *"
        type="date"
        register={register("birthday", {
          required: true,
        })}
      />
      {errors?.birthday?.type === "required" && (
        <FormError>Este campo es requerido</FormError>
      )}

      <AppInput
        label="Edad *"
        type="number"
        register={register("age", {
          required: true,
          min: 3,
        })}
      />
      {errors?.age?.type === "required" && (
        <FormError>Este campo es requerido</FormError>
      )}
      {errors?.age?.type === "min" && (
        <FormError>La edad mínima es de 3 años</FormError>
      )}

      <AppTextArea
        label="Ocupación *"        
        register={register("occupation", {
          maxLength: 255,
          required: true,
        })}
      />
      {errors?.occupation?.type === "required" && (
        <FormError>Este campo es requerido</FormError>
      )}
      {errors?.occupation?.type === "maxLength" && (
        <FormError>Máximo de caracteres: 255</FormError>
      )}

      <AppTextArea
        label="Dirección *"        
        register={register("address", {
          maxLength: 255,
          required: true,
        })}
      />
      {errors?.address?.type === "required" && (
        <FormError>Este campo es requerido</FormError>
      )}
      {errors?.address?.type === "maxLength" && (
        <FormError>Máximo de caracteres: 255</FormError>
      )}

      <AppTextArea
        readOnly={props.edit ? true : false}
        label="Historia médica"        
        register={register("medical_history", {
          maxLength: 255,
        })}
      />
      {errors?.medical_history?.type === "maxLength" && (
        <FormError>Máximo de caracteres: 255</FormError>
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
