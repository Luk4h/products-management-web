import { type SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react"

type FormInputs = {
  username: string;
  password: string;
}

const useLogin = () => {
  const methods = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: true,
      callbackUrl: "/"
    });
  };

  return { methods, handleSubmit: methods.handleSubmit(onSubmit) };
}

export default useLogin;
