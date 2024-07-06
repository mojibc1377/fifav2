import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "mail@mail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const existingUser = await db.user.findUnique({
          where: { email: credentials.email }
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(credentials.password, existingUser.password);
        if (!passwordMatch) {
          return null;
        }

        return {
          id: `${existingUser.id}`,
          email: existingUser.email,
          userName: existingUser.userName,
          phone: existingUser.phone,
          createdAt: existingUser.createdAt,
          credit: existingUser.credit,
          avatar:existingUser.avatar
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          userName: user.userName,
          phone: user.phone,
          createdAt: user.createdAt,
          credit: user.credit,
          avatar : user.avatar
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          userName: token.userName,
          phone: token.phone,
          createdAt: token.createdAt,
          credit: token.credit,
          avatar:token.avatar
        },
      };
    }
  }
};