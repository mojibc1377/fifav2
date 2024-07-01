import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import { db } from "./db";
import { compare } from "bcrypt";



export const authOptions : NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn: '/signin',
    },
    session:{
        strategy:'jwt'
    }, 
    providers: [
        CredentialsProvider({
          name: "Credentials",
         
          credentials: {
            email: { label: "Email", type: "email", placeholder: "mail@mail.com" },
            password: { label: "Password", type: "password" }
          },

          async authorize(credentials) {
            if(!credentials?.email || !credentials?.password){
                return null
            }
            
            const existingUser = await db.user.findUnique({
                where:{ email : credentials.email }
                    });

            if (!existingUser) {
              return null;
            } 

            const passwordMatch = await compare(credentials.password , existingUser.password);
            if(!passwordMatch){ 
                return null;
            }

            return{
                id: `${existingUser.id}`,
                email: existingUser.email,
                userName: existingUser.userName,
                phone : existingUser.phone,
                createdAt :existingUser.createdAt
                
                }
            }
        })
      ],
      callbacks:{
          
        async jwt({ token, user}) {
            if(user){
            return{
                ...token,
                userName : user.userName
            }
          }
          return token
        }
          ,

          async session({ session, token }) {
            return{
                ...session,
                user:{
                    ...session.user,
                    userName : token.userName
                }
            }
          }
        }
}