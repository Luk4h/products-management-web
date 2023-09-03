import { type Metadata } from 'next'
import { auth } from '~/auth'
 
export const metadata: Metadata = {
  title: 'Gerenciamento de inventário | TecadiLabs',
}
 
export default async function Page() {
  const session = await auth()
  return (
    <>
      <pre>{JSON.stringify(session)}</pre>
      <div>index.tsx</div>
    </>
  )
}