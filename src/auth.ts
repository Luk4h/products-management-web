import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions as NextAuthConfig } from "next-auth"
import { getServerSession } from "next-auth"
import credentialsProvider from "next-auth/providers/credentials";


export const config = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    credentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        console.log(credentials);
        return {
          name: "Luiz Gustavo",
          id: "1",
        };
      },
    })
  ],
  pages: {
    signIn: '/entrar',
    error: '/entrar'
  }
} satisfies NextAuthConfig

// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, config)
}
