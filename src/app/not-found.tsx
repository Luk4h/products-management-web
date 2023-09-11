import { redirect } from "next/navigation"

//? Para redirecionar todas as requisições 404 para /dashboard 

const NotFound = () => {
  redirect('/dashboard');
}

export default NotFound;