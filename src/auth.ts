import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { upsertPilotFromSession } from "@/lib/arcade/pilot-repository";

const authSecret =
  process.env.AUTH_SECRET ??
  process.env.NEXTAUTH_SECRET ??
  (process.env.NODE_ENV === "development"
    ? "dev-only-secret-set-AUTH_SECRET-in-env-local"
    : undefined);

const googleProviders =
  process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
    ? [
        Google({
          clientId: process.env.AUTH_GOOGLE_ID,
          clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
      ]
    : [];

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: authSecret,
  trustHost: true,
  providers: [...googleProviders],
  session: { strategy: "jwt" },
  events: {
    async signIn({ user }) {
      if (user.id && user.email) {
        await upsertPilotFromSession({
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }).catch(() => {
          /* Mongo optional at sign-in */
        });
      }
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
      }
      return session;
    },
  },
});
