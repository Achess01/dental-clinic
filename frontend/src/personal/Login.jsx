import React from "react";
import { SmallContainer } from "../components/Container";
import { useForm } from "react-hook-form";
// Components
import { AppButtonDark } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { ErrorFieldForm as FormError } from "../components/ErrorFieldForm";

export const LoginForm = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    reset({
      username: "",
      password: "",
    });
    //console.log(data);
  };

  return (
    <SmallContainer>
      <div className="d-flex flex-column align-items-center justify-content-center m-5">
        <img src="/src/assets/CIAN.svg" alt="logo" width="150px" className="my-5"/>
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
            register={register("password", {
              required: true,
            })}
          />
          {errors?.password?.type === "required" && (
            <FormError>Ingrese una contraseña</FormError>
          )}
          <div className="d-flex align-items-center justify-content-center">
            <AppButtonDark>Ingresar</AppButtonDark>
          </div>
        </form>
      </div>
    </SmallContainer>
  );
};
