import NextAuth from "next-auth/next"
import { config } from "~/auth"

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(config)
export { handler as GET, handler as POST }
