"use client"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { redirect } from 'next/navigation';
import { ChevronRight } from 'react-feather'





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
      if(status === "authenticated") {
       redirect("/dashboard");
    
   }
  
   },[status])
  return (
   <main id="homeMain" className='bg-neutral-600 w-full h-full flex items-center justify-center flex-wrap flex-col'>
    <header className='w-full px-[30px] py-1 flex items-center justify-between  min-h-[50px]'>
      
    <h1 className=' text-white font-3xl '>CHATLY</h1>
    {status === "authenticated" ? (
   <button onClick={() => signOut({
  })}  className='py-3 px-6   rounded-lg'>
    Logout
  </button>
 ):(
  <button onClick={() => router.push
  ('/login')}  className='py-3 px-6   rounded-lg'>
    Login
  </button>
 )}
    </header>
    <div className='w-full flex-1 flex   items-center justify-center flex-col'>
      <h1 className='text-4xl py-3'>The easiest way to chat together!</h1>
     <button onClick={() => router.push("/login")} className='py-3 my-4 flex flex-row items-center justify-center px-16 rounded-lg bg-gradient-to-r from-[#1170FF] to-[#002DFF]'>Let&apos;s start <ChevronRight aria-label="Right"/></button>
    
    </div>


   </main> 
  )
}
