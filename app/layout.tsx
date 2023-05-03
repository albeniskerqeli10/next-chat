import './globals.css'
import "./tailwind.css";
import {Poppins } from 'next/font/google';
import
 { Analytics } 
from
 
'@vercel/analytics/react'
;
import GithubSessionProvider from '@/providers/SessionProvider';

export const metadata = {
  title: 'Chatly| Chat with your friends',
  description: 'A simple chatting app using Next.js with Server Components, Prisma and PlanetScale',
}
const poppins = Poppins({ weight: "600", subsets: ["latin"] });
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
