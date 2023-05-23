import React, { useEffect } from "react";
//Hooks
import { useForm } from "react-hook-form";
// Components
import { SmallContainer } from "../components/Container";
import { AppButtonDark } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { ErrorFieldForm as FormError } from "../components/ErrorFieldForm";
import { Spinner } from "../components/Spinner";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { login, clearStatus } from "../store/user";
import logo from "../assets/CIAN.svg";

export const LoginForm = (props) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(login({ credentials: data }));
    reset({
      username: "",
      password: "",
    });
  };

  useEffect(() => {
    dispatch(clearStatus());
  }, []);

  return (
    <SmallContainer>
      <div className="d-flex flex-column align-items-center justify-content-center m-5">
        <img
          src={logo}
          alt="logo"
          width="150px"
          className="my-5"
        />
        {status === "loading" ? (
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
              register={register("password", {
                required: true,
              })}
            />
            {errors?.password?.type === "required" && (
              <FormError>Ingrese una contraseña</FormError>
            )}

            {status === "failed" && (
              <FormError>Usuario o contraseña incorrectos</FormError>
            )}
            <div className="d-flex align-items-center justify-content-center">
              <AppButtonDark>Ingresar</AppButtonDark>
            </div>
          </form>
        )}
      </div>
    </SmallContainer>
  );
};
