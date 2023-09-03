import { type Metadata } from "next";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import "~/styles/globals.css";

export const metadata: Metadata = {
  title: 'Gerenciamento de inventário | TecadiLabs',
  description: 'Sistema de Gerenciamento de Inventário para o desafio de recrutamento da TecadiLabs.',
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
