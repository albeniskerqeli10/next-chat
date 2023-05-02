import './globals.css'
import "./tailwind.css";
import { Inter, Poppins } from 'next/font/google';
import
 { Analytics } 
from
 
'@vercel/analytics/react'
;
export const metadata = {
  title: 'Chatly| Chat with your friends',
  description: 'Generated by create next app',
}
const poppins = Poppins({ weight: "600", subsets: ["latin"] });
import { SessionProvider } from 'next-auth/react';
import GithubSessionProvider from '@/providers/SessionProvider';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
<html lang="en" >
      <body className={poppins.className}>
        <GithubSessionProvider>
        {children}
        </GithubSessionProvider>
        <Analytics/>
        <div id="modal-root"></div>

      </body>

    </html>


  )
}
