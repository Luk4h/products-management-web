'use client'

import Link from "next/link";
import Button from "@/components/Button"
import TextInput from "@/components/Input/FormTextField"
import PasswordInput from "@/components/Input/FormPasswordField"
import SignInForm from "../forms/SignInForm";
import Logo from "./Logo";
import Splash from "./Splash";

const FormCard = () => {

  return (
    <div id="FormBackground" className='relative w-full flex-grow h-auto md:min-h-screen flex flex-col md:flex-row'>
      <Splash />
      <SignInForm>
        <Logo />
        <h3 className='text-xl font-bold'>Entrar na sua conta</h3>
        <TextInput
          placeholder='Usuário'
          type='text' 
          enterKeyHint='next' 
          name="username" 
          required={true} 
          aria-label="Digite seu usuário"
        />
        <PasswordInput 
          placeholder='Senha' 
          type='password' 
          enterKeyHint='send' 
          name="password" 
          required={true} 
          minLength={6} 
          aria-label="Digite sua senha"
        />
        <div className='flex flex-col gap-2'>
          <Button type="submit">Acessar</Button>
          <Link href='/' className='text-slate-500 disabled font-light'>Esqueci a senha</Link>
        </div>
        <div className='w-full h-8 flex items-end justify-center'>
          <p className='text-slate-600 disabled'>Desafio TecadiLabs - Luiz Gustavo</p>
        </div>
      </SignInForm>
    </div>
  )
}

export default FormCard;