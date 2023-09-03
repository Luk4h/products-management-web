'use client'

import { useFormContext } from "react-hook-form";
import EyeIcon from "../icons/Eye";
import usePeek from "~/app/entrar/hooks/usePeek";
import CrossedEyeIcon from "../icons/CrossedEye";

//? Para garantir que a propriedade name e type sempre existem
type CustomInputProps = {
  name: string;
  type: string;
}
type InputProps = CustomInputProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = ({name, required, type, ...props}: InputProps) => {
  const { register } = useFormContext();
  const { isPeeking, handlePeek } = usePeek();

  return (
  <div className="w-full h-12 border border-slate-200 rounded-md relative flex items-center">
    <input
      className="w-full h-full rounded-md px-2"
      required={required}
      type={ isPeeking ? 'text' : type }
      {...register(name, {required})}
      {...props}
    />
    
    <button className='absolute right-2 p-2 text-slate-500 w-12 flex justify-center items-center' type='button' onClick={handlePeek} aria-label={ isPeeking ? 'Esconder senha.' : 'Mostrar senha.'}>
       { isPeeking ? <CrossedEyeIcon /> : <EyeIcon /> }
    </button>
  </div>
  )
};

export default Input;