 //@ts-ignore

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
export const authOptions = {
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
    
    
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)
