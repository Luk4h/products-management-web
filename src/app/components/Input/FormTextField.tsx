'use client'

import { useFormContext } from "react-hook-form";

//? Para garantir que a propriedade name sempre existe
type CustomInputProps = {
  name: string;
}
type InputProps = CustomInputProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = ({name, required, ...props}: InputProps) => {
  const { register } = useFormContext();
  return <input className="w-full h-12 border border-slate-200 rounded-md px-2" required={required} {...register(name, {required})} {...props} />
};

export default Input;