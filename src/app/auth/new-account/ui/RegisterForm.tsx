"use client";

import { registerUser } from "@/actions";
import { login } from "@/actions/auth/login";
import clsx from "clsx";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  //   const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    setErrorMessage("");
    const { name, email, password } = data;
    const resp = await registerUser(name, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    await login(email.toLowerCase(), password);
    // router.replace("/");
    window.location.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/* {errors.name?.type === "required" && (
        <span className="text-red-500">* El nombre es obligatorio</span>
      )} */}
      <label htmlFor="name">Nombre Completo</label>
      <input
        className={clsx("mb-5 rounded border bg-gray-200 px-5 py-2", {
          "border-red-500": !!errors.name,
        })}
        type="text"
        autoFocus
        {...register("name", { required: true })}
      />

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx("mb-5 rounded border bg-gray-200 px-5 py-2", {
          "border-red-500": !!errors.email,
        })}
        type="email"
        {...register("email", {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        })}
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className={clsx("mb-5 rounded border bg-gray-200 px-5 py-2", {
          "border-red-500": !!errors.password,
        })}
        type="password"
        {...register("password", { required: true, minLength: 4 })}
      />

      <span className="text-red-500">{errorMessage}</span>

      <button className="btn-primary">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="my-5 flex items-center">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
