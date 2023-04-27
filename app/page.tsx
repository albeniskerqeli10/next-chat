"use client"

import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from './page.module.css'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { redirect } from 'next/navigation';





const exampleChatRoom  = {
  
  title: "General",
   author:"Dan Abramov",
   authorId:12345678
  // createdAt: "2023-04-03T14:30:00Z",
  // updatedAt: "2023-04-03T14:35:00Z",
  // messages: {
  //   create:[
  //     {
  //       id: "98765432-dcba-hgfe-lkji-0987654321ba",
  //       text: "Hello world!",
  //       roomId: "12345678-abcd-efgh-ijkl-1234567890ab"
  //     },
  //     {
  //       id: "13579024-acbd-egfh-jilk-2468135790ab",
  //       text: "How's everyone doing?",
  //       roomId: "12345678-abcd-efgh-ijkl-1234567890ab"
  //     }
  //   ]
  // }
}



export default function Home() {
  const { data: session, status } = useSession();
    const router = useRouter();

    
    useEffect(() => {
      if(session === null) {
       redirect("/login");
    
    }
    },[session])
  return (
   <main>
    <h1 className='bg-blue-500 text-white font-3xl p-3'>Candly.</h1>
    <Link href="/dashboard">Go to Dashboard</Link>

 {status === "authenticated" ? (
   <button onClick={() => signOut({
  })}  className='py-3 px-6 m-3 bg-blue-600 rounded-lg'>
    Logout
  </button>
 ):(
  <button onClick={() => router.push
  ('/login')}  className='py-3 px-6 m-3 bg-blue-600 rounded-lg'>
    Login
  </button>
 )}
 {/* <button onClick={ createChatRoom}>Create a Room</button> */}


   </main> 
  )
}
