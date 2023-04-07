import './globals.css'
import "./tailwind.css";
import { Inter, Poppins } from 'next/font/google';
const metadata = {
  title: 'Create Next App',
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
    <html lang="en">
      <GithubSessionProvider>
      <body className={poppins.className}>{children}</body>
      </GithubSessionProvider>
    </html>

  )
}
