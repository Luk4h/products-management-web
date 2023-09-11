import { type Metadata } from 'next'
import FormCard from './components/FormCard'
import { auth } from '~/auth'
import { redirect } from 'next/navigation'
 
export const metadata: Metadata = {
  title: 'Entrar - Gerenciamento de inventário | TecadiLabs',
}

export default async function Page() {
  const session = await auth();
    
  //? Caso usuário já esteja logado, redireciona ele para o dashboard
  if (session)
    redirect("/dashboard");

  return  (
    <main id="LoginPage" className='min-w-screen max-w-screen min-h-screen flex flex-col md:flex-row bg-slate-500'>
      {/* <Splash /> */}
      <FormCard />
    </main>
  )
} 