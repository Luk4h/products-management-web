'use client'

import { useFormContext } from "react-hook-form";

//? Para garantir que a propriedade name sempre existe
type CustomInputProps = {
  name: string;
}
type InputProps = CustomInputProps & React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

const Select = ({name, required, children, ...props}: InputProps) => {
  const { register } = useFormContext();

  return (
    <select className="w-full h-12 border border-slate-200 rounded-md px-2" required={required} {...register(name, {required})} {...props}>
      {children}
    </select>
  )
};

export default Select;