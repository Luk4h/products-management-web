import NextAuth from "next-auth";

import { authOptions } from "~/server/auth";


//? Biblioteca não possui tipagem para o retorno desta função
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };