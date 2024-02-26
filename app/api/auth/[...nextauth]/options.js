import CredentialsProvider from "next-auth/providers/credentials";
import directus from "@/lib/directus";
import { readMe, withToken } from "@directus/sdk";

export const options = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:8055/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        if (!res.ok && user) {
          throw new Error("Email address or password is invalid");
        }
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const userData = await directus.request(
          withToken(
            user.data.access_token,
            readMe({
              fields: ["id", "first_name", "last_name","role"],
            })
          )
        );
        return {
          ...token,
          accessToken: user.data.access_token,
          refreshToken: user.data.refresh_token,
          user: userData,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user = token.user;
      return session;
    },
  },
};
