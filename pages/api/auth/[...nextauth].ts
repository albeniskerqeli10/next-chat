 //@ts-ignore
import { useId } from "react"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { prisma } from "@/lib/prisma"
export const authOptions:any = {
  // adapter: PrismaAdapter(prisma),

  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as any,
      clientSecret:process.env.GITHUB_CLIENT_SECRET as any,
      authorization:{
        params:{
          redirect_uri:`${process.env.NEXTAUTH_URL}/api/auth/callback/github`
        }
      }
      
      
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as any,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET as any,
    })
   
    
    
    // ...add more providers here
  ],
  // callbacks: {      // @ts-ignore
  //      session: async (session, user, sessionToken) => {
  //       console.log(session,user)
  //       return Promise.resolve(session)
  //      }}
}
export default NextAuth(authOptions)
