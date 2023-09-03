'use client'

//! https://github.com/react-hook-form/documentation/issues/70
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

//? Tratado dentro do hook para realizar o login
/* eslint-disable @typescript-eslint/no-misused-promises */

import { type DetailedHTMLProps, type FormHTMLAttributes, type ReactElement } from "react";
import useLogin from "../hooks/useLogin";
import { FormProvider } from "react-hook-form";

type CustomSignInFormProps = {
  children: ReactElement | ReactElement[]
}

type SignInFormProps = CustomSignInFormProps & DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

const SignInForm = ({ children }: SignInFormProps) => {
  const { methods, handleSubmit } = useLogin();
  return (
    <FormProvider {...methods} >
      <form id="FormCard" onSubmit={handleSubmit} className='p-8 items-center md:justify-center w-full h-full md:h-full bg-white flex flex-col shadow-xl self-end md:max-w-2xl z-20'>
        <div id='FormContent'className="w-full max-w-sm flex flex-col gap-6">
          {children}
        </div>
      </form>
    </FormProvider>
  )
}

export default SignInForm;