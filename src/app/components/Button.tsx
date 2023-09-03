'use client'

import { useFormContext } from "react-hook-form";

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button = ({children, ...props}: ButtonProps) => {
  const { formState } = useFormContext();
  return (
    <button className='w-full h-12 bg-blue-600 rounded-md px-2 text-white font-medium' disabled={formState.isSubmitting} {...props}>
      {formState.isSubmitting ? 'Carregando...' : children}
    </button>
  )
};

export default Button;