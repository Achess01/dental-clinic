import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { changeInitialPassword } from "../config/api";

// Components
import { SmallContainer } from "../components/Container";
import { AppButtonDark } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { ErrorFieldForm as FormError } from "../components/ErrorFieldForm";
import { Spinner } from "../components/Spinner";

export const ChangePasswordForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    if (data["password"] !== data["password_confirmation"]) {
      setError(true);
      return;
    }
    setLoading(true);
    const response = await changeInitialPassword(data);
    if (!response) {
      setError(true);
    } else {
      setError(false);
      alert("Se ha cambiado su contraseña");
    }
    setLoading(false);
    if (formState.isSubmitSuccessful) {
      reset({
        username: "",
        old_password: "",
        password: "",
        password_confirmation: "",
      });
    }
  };

  return (
    <SmallContainer>
      <div className="d-flex flex-column align-items-center justify-content-center m-5">
        <img
          src="/src/assets/CIAN.svg"
          alt="logo"
          width="150px"
          className="my-5"
        />
        {error && (
          <div className="w-50">
            <FormError>
              Asegurese que sus credenciales sean las correctas. Use una
              contraseña segura: mínimo 5 caracteres, use dígitos y letras. Si
              ya cambió su contraseña antes vaya al apartado de Login. Las nueva
              contraseña y la confirmación deben de ser iguales
            </FormError>
          </div>
        )}
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <AppInput
              icon="bi bi-person"
              placeholder="Ingrse su usuario (rut)"
              label="Rut"
              type="text"
              register={register("username", {
                required: true,
              })}
            />
            {errors?.username?.type === "required" && (
              <FormError>Ingrese el usuario</FormError>
            )}

            <AppInput
              icon="bi bi-key"
              placeholder="Ingrese su contraseña"
              label="Contraseña"
              type="password"
              register={register("old_password", {
                required: true,
              })}
            />
            {errors?.old_password?.type === "required" && (
              <FormError>Ingrese su contraseña</FormError>
            )}

            <AppInput
              icon="bi bi-key-fill"
              placeholder="Ingrese su nueva contraseña"
              label="Contraseña"
              type="password"
              register={register("password", {
                required: true,
              })}
            />
            {errors?.password?.type === "required" && (
              <FormError>Ingrese la nueva contraseña</FormError>
            )}

            <AppInput
              icon="bi bi-key-fill"
              placeholder="Confirmación de la nueva contraseña"
              label="Contraseña"
              type="password"
              register={register("password_confirmation", {
                required: true,
              })}
            />
            {errors?.password_confirmation?.type === "required" && (
              <FormError>Ingrese la confirmación de la contraseña</FormError>
            )}

            <div className="d-flex align-items-center justify-content-center">
              <AppButtonDark>Cambiar contraseña</AppButtonDark>
            </div>
          </form>
        )}
      </div>
    </SmallContainer>
  );
};
