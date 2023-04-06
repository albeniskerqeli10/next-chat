"use client"
import React, { Suspense } from 'react'
import Link from 'next/link';
import { useSession,signOut, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter,usePathname } from 'next/navigation';
import { LogOut, Plus } from 'react-feather';
const RightContent = ({rooms}:any) => {
  const router = useRouter();
  const pathname = usePathname();
  const {data:session,status} = useSession();
  const lastPart = pathname?.split('/').pop();
  const createChatRoom = async() => {
    try {
      await fetch("/api/createPost" ,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          title:"Programmers",
          author:"Albenis Kerqeli",
          authorId:87654321,
          messages:[
            {
              content:"Hello world!",             
              author:"Dan Abramov",
              authorId:12345678
              
              
            }
          ]

        })
      })
    }
    catch(err) {
      console.log(err);
    }
  }


  const handleChatRoom = async() => {
    await createChatRoom();
    //@ts-ignore
    router.refresh();
    // console.log("Channel has been added successfully");
  }
  return (
    <aside className="w-[230px] min-h-[100vh] bg-neutral-950  fixed top-0 left-0 right-0 flex items-start justify-between flex-col flex-wrap">
      <div className="w-full flex flex-col flex-wrap">
<div className='w-full flex items-center justify-between flex-row flex-wrap py-4 px-6'>
<h1>Channels</h1>
<Plus onClick={handleChatRoom}/>
</div>
<div className="py-3 px-6 flex flex-col flex-wrap">
     <Suspense fallback="Loading...">
    <ul>
    {rooms?.map((room:any) => (
<li className={`py-2 ${Number(lastPart)=== room.id && "border-b-2 border-blue-500"}`} key={room.id}>        <Link href={`/dashboard/${room.id}`}>{room.title}</Link>
</li>
))}
</ul>
     </Suspense>
     </div>
    
     </div>
        {/* <input type="search" placeholder="Search rooms"/> */}
       {status==="authenticated" ?  <div className='flex  py-3 px-6  w-full items-center justify-between flex-row flex-wrap '>
        <Image src={session?.user?.image as any} width={30} height={30} className='rounded-full' alt="user image"/>
          <h1 className='text-sm'>{session?.user?.name}</h1>
          <LogOut size="16" onClick={() => signOut()}/>
        </div>:<button onClick={() => signIn("github")}>Log In</button>}
        </aside>
  )
}

export default RightContent