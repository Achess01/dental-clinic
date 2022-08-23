/* 
  Record create and edit form
 */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// Components
import { AppButton } from "../components/AppButton";
import { AppSelect, AppTextArea } from "../components/AppInput";
import { ErrorFieldForm as FormError } from "../components/ErrorFieldForm";
import { Spinner } from "../components/Spinner";

// Api
import {
  getAllGeneric,
  DIAGNOSTICS,
  TREATMENTS,
  TREATMENTS_PERFORMED,
  ATTENTION_TYPES,
  ATTENDANCE_STATES,
  VOUCHER_STATES,
  SURFACES,
} from "../config/api";

// Redux
import { useSelector } from "react-redux";

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

  /* user */
  const user = useSelector((state) => state.user.user);

  /* If a submit function is not provided */
  const onSubmit = props.onSubmit || function (data) {};

  /* States */
  const [formData, setFormData] = useState({
    diagnostics: [],
    treatments: [],
    treatments_performed: [],
    attention_types: [],
    attendance_states: [],
    voucher_states: [],
    surfaces: [],
  });

  const [loading, setLoading] = useState(false);

  /* Set values */
  const setValues = () => {
    if (props.values) {
      let vals = Object.entries(props.values);
      for (let val of vals) {
        setValue(val[0], val[1]);
      }
    }
  };

  /* Get all values for form */
  useEffect(() => {
    const getAll = async () => {
      setLoading(true);
      const d =
        (await getAllGeneric({ token: user.token, path: DIAGNOSTICS })) || [];
      const t =
        (await getAllGeneric({ token: user.token, path: TREATMENTS })) || [];
      const tp =
        (await getAllGeneric({
          token: user.token,
          path: TREATMENTS_PERFORMED,
        })) || [];
      const at =
        (await getAllGeneric({ token: user.token, path: ATTENTION_TYPES })) ||
        [];
      const as =
        (await getAllGeneric({ token: user.token, path: ATTENDANCE_STATES })) ||
        [];
      const vs =
        (await getAllGeneric({ token: user.token, path: VOUCHER_STATES })) ||
        [];
      const s =
        (await getAllGeneric({ token: user.token, path: SURFACES })) || [];

      setFormData({
        diagnostics: d,
        treatments: t,
        treatments_performed: tp,
        attention_types: at,
        attendance_states: as,
        voucher_states: vs,
        surfaces: s,
      });
      setValues();
      setLoading(false);
    };

    getAll();
  }, []);

  /* Update field values */
  useEffect(() => {
    setValues();
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
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <AppSelect
            label="Tipo de atención *"
            register={register("attention_type", {
              validate: (value) => value != -1,
            })}
          >
            <option value={-1}>----</option>
            {/* Add more options using API */}
            {Object.entries(formData.attention_types).map((data, index) => {
              return (
                <option key={index} value={data[0]}>
                  {data[1]}
                </option>
              );
            })}
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
            {formData.treatments.map((i, index) => (
              <option key={index} value={i.id}>
                {i.name} {i.description}
              </option>
            ))}
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
            {Object.entries(formData.surfaces).map((data, index) => {
              return (
                <option key={index} value={data[0]}>
                  {data[1]}
                </option>
              );
            })}
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
            {formData.treatments_performed.map((i, index) => (
              <option key={index} value={i.id}>
                {i.name} {i.description}
              </option>
            ))}
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
            {formData.diagnostics.map((i, index) => (
              <option key={index} value={i.id}>
                {i.name} {i.description}
              </option>
            ))}
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
            {Object.entries(formData.attendance_states).map((data, index) => {
              return (
                <option key={index} value={data[0]}>
                  {data[1]}
                </option>
              );
            })}
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
            {Object.entries(formData.voucher_states).map((data, index) => {
              return (
                <option key={index} value={data[0]}>
                  {data[1]}
                </option>
              );
            })}
          </AppSelect>
          {errors?.voucher_state?.type === "validate" && (
            <FormError>Elija una opción válida</FormError>
          )}

          <AppButton type="submit">Registrar</AppButton>
        </form>
      )}
    </>
  );
};
