import { type Metadata } from "next";

import "~/styles/globals.css";

export const metadata: Metadata = {
  title: 'Gerenciamento de inventário | TecadiLabs',
  description: 'Sistema de Gerenciamento de Inventário para o desafio de recrutamento da TecadiLabs.',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
