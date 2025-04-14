import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/app/api/postgresql";
import bcrypt from "bcrypt";

export const options = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Získame používateľa z databázy
        const result = await pool.query('SELECT * FROM "Users" WHERE email = $1', [email]);

        if (result.rows.length === 0) {
          throw new Error("Používateľ neexistuje");
        }

        const user = result.rows[0];

        // Overenie hesla
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Nesprávne heslo");
        }

        // Vrátime používateľa bez hesla
        delete user.password;

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};