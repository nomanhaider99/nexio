import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import db from "./lib/db"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import userModel  from "./models/user"
import bcryptjs from "bcryptjs"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(db as any),
  providers: [
    CredentialsProvider({
        name: "creadentials",
        credentials: {
            email: {type: "email", required: true, label: "Email"},
            password: {type: "password", required: true, label: "Password"}
        },
        async authorize(credentials: any) {
            await db();
            try {
                const user = await userModel.findOne({email: credentials.email});
                if (!user) {
                    throw new Error("user doesnot exists")
                }
                const isPasswordCorrect = await bcryptjs.compare(credentials.password, user.password);
                if (!isPasswordCorrect) {
                    throw new Error("Incorrect Password")
                }
                return user
            } catch (error: any) {
                throw new Error(error.message)
            }
        },
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/signin"
  },
  callbacks: {
    async session({session, token}) {
      if (token.sub && token.role) {
        session.user.id = token.sub;
      }
      return session
    },
    async jwt({token , user}) {
      return token
    },
    
  }
})