import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { DefaultSession, NextAuthOptions as NextAuthConfig } from "next-auth"
import { getServerSession } from "next-auth"
import credentialsProvider from "next-auth/providers/credentials";
import apiTecadi from "./app/api/tecadi";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      accessToken: string;
      name: string;
      email: string;
    };
  }

  interface User {
    name: string;
    email: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    name: string;
    email: string;
    accessToken: string;
  }
}

export const config = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    credentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials)
          throw new Error("Usuário ou senha não informados");

        const data = await apiTecadi.authenticate(credentials)
          .then(data => {
            console.log({data});
            return data;
          })
          .catch((err: Error) => {
            console.log(err.message);
            throw new Error(encodeURI(err.message));
          })

        return data;
      },
    })
  ],
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.accessToken = token.accessToken;
      return session
    },
  },
  session: {
    maxAge: 1 * 60 * 60, // 7 days
    updateAge: 0, // 24 hours
  },
  jwt: {
    maxAge: 1 * 60 * 60, // 7 days
  },
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
