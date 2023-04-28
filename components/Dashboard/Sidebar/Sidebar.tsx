"use client"
import Link from 'next/link';
import { useSession,signOut, signIn, } from 'next-auth/react';
import Image from 'next/image';
import { useRouter,usePathname } from 'next/navigation';
import { LogOut, Plus } from 'react-feather';
import { Component, FormEvent, useState } from 'react';
import Modal from '../../UI/Modal';
import { useStore } from '@/store/state';
const ComponentId = "sidebar";
const Sidebar = ({rooms}:any) => {
  const router = useRouter();
  const pathname = usePathname();
  const {data:session,status} = useSession();
const toggle = useStore((state:any) => state.modals[ComponentId]);
const setToggle = useStore( (state:any) => state.setToggle);
  const [roomData,setRoomData] = useState({
    title:"",
    owner:""
  })
  // const lastPart = pathname?.split('/').pop();



  const handleChatRoom = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/room" ,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          title:roomData.title,
          author:roomData.owner,
          authorId:555555555,
          messages:[
            {
              content:"Hello world!",             
              author:session?.user?.name,
              
              authorId:555555555
              
              
            }
          ]

        })
      })
      if(res.ok) {
        setToggle(ComponentId,false);
        // const id = await res.json().then(data => data.id)
        router.refresh();
        // router.push(`/dashboard/${id}`);

      }
    }
    catch(err) {
      console.log(err);
    }
    //@ts-ignore
    // console.log("Channel has been added successfully");
  }
  return (
    <aside className="w-[100px]  sm:w-[230px] h-[100vh] bg-neutral-950  fixed top-0 left-0 right-0 flex items-start justify-between flex-col flex-nowrap">
      <div className="w-full flex flex-col flex-wrap">
<div className='w-full flex items-center justify-between flex-row flex-wrap py-4 px-1 sm:py-4 sm:px-6'>
<h1 className="text-xs sm:text-lg">Channels</h1>
<button onClick={() => setToggle(ComponentId, true)}><Plus/></button>
{toggle && <Modal handleClose={() => setToggle(ComponentId, false)}>
<form method='POST' onSubmit={handleChatRoom} className='w-full  min-h-[200px] px-5 gap-2 flex items-start justify-center flex-col flex-wrap'>
<label htmlFor='title' className='py-2 text-sm'>Room Title</label>

<input className='w-full my-2 px-4 py-4 text-xs rounded-sm placeholder-neutral-500 bg-neutral-900' type="text" onChange={(e) => setRoomData({
  ...roomData,
  title:e.target.value
} )} placeholder="Enter room name" required name="title"/>
<label className="py-2 text-sm" htmlFor='owner'>Room Owner</label>
<input className='w-full my-2 text-xs placeholder-neutral-500 px-4 py-4 rounded-sm  bg-neutral-900' onChange={(e) => setRoomData({
  ...roomData,
  owner:e.target.value
})} type="text" placeholder="Enter room owner" required name="owner"/>
<button className='bg-gradient-to-r from-[#1170FF] to-[#002DFF] rounded-sm py-3 w-full my-6'>Create</button>
</form>
</Modal>}
{/* <Plus onClick={handleChatRoom}/> */}
</div>
<div className="px-1 py-1 sm:py-3 sm:px-6 flex flex-col flex-wrap ">
<ul>

    {rooms?.map((room:any) => (
<li className={`py-2 text-ellipsis w-[20px] sm:w-full px-1 ${pathname?.includes(room.id) && "border-b-2 border-blue-500"}`} key={room.id}>        <Link className="text-[12px] text-white sm:text-base" href={`/dashboard/${room.id}`}>{room.title}</Link>
</li>
))}
     </ul>

     </div>
    
     </div>
        {/* <input type="search" placeholder="Search rooms"/> */}
       {status==="authenticated" &&  <div className='flex  py-8 px-6  w-full items-center justify-between sm:justify-between flex-col sm:flex-row flex-wrap '>
        <Image src={session?.user?.image as any} width={30} height={30} className='rounded-full ' alt="user image"/>
          <h1 className=' text-[12px] sm:text-sm'>{session?.user?.name}</h1>
          <LogOut size="16" onClick={() => signOut({
            callbackUrl:"/login",
          })}/>
        </div>}
        </aside>
  )
}

export default Sidebar;