"use client"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { redirect } from 'next/navigation';
import { ChevronRight } from 'react-feather'



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
