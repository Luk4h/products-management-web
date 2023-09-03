import { type Metadata } from "next";

import "~/styles/globals.css";

export const metadata: Metadata = {
  title: 'Gerenciamento de inventário | TecadiLabs',
  description: 'Sistema de Gerenciamento de Inventário para o desafio de recrutamento da TecadiLabs.',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className="bg-zinc-300">{children}</body>
    </html>
  )
}
