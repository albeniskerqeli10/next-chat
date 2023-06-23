"use client"
import Link from 'next/link';
import { useSession,signOut } from 'next-auth/react';
import Image from 'next/image';
import {usePathname ,useRouter } from 'next/navigation';
import { LogOut, Plus, Trash2 } from 'react-feather';
import { useStore } from '@/store/state';
import AddRoomModal from './AddRoomModal';
import { startTransition } from 'react';
const ComponentId = "sidebar";
const Sidebar = ({rooms}:{rooms:Rooms}) => {
  const router = useRouter();
  const pathname = usePathname();
  const {data:session,status} = useSession();
const toggle = useStore((state:State | any) => state.modals[ComponentId]);
const show = useStore((state:State | any) => state.show);
const setToggle = useStore( (state:State | any) => state.setToggle);
const handleRoomDelete = async(id:string) => {
  const formatedID = parseInt(id,10);

  try {
    const res = await fetch(`/api/room/${formatedID}`, {
      method:"DELETE"
    });
    if(res.ok) {
      startTransition(() => {
router.refresh();
router.push("/dashboard");

      })
    }
    else {
      throw new Error("Something went wrong");
    }
  }
  catch(err) {
  }
}
  return (
    <aside className={`w-[100px]  sm:w-[230px] h-[100vh] bg-black  fixed top-0 left-0 right-0 ${!show ? "flex":"hidden"} flex items-start justify-between flex-col flex-nowrap`}>
      <div className="w-full flex flex-col flex-wrap">
<div className='w-full flex items-center justify-between flex-row flex-wrap py-4 px-1 sm:py-4 sm:px-6'>
  
<h1 className="text-xs sm:text-lg">Rooms</h1>
<button onClick={() => setToggle(ComponentId, true)}><Plus aria-label="Add"/></button>
{toggle && <AddRoomModal session={session as Session}/>}
</div>
<div className="w-full px-1 py-1 sm:py-3 sm:px-6 flex flex-col flex-wrap ">
<ul className="w-full">

    {rooms?.map((room:Room) => (
<li className={`py-2 text-ellipsis w-[20px] flex items-center justify-between sm:w-full  ${pathname?.endsWith(room.id as string) && "border-b-2 border-blue-500"}`} key={room.id}>        <Link className="text-[12px] text-white sm:text-base" href={`/dashboard/${room.id}`}>{room.title}</Link>
 {parseInt(session?.user?.id as string, 10) === parseInt(room.authorId as any) && (<Trash2 aria-label="Delete" className="cursor-pointer" onClick={() => handleRoomDelete(room.id as string)} size="16"/>)}
</li>
))}
     </ul>

     </div>
    
     </div>
        {/* <input type="search" placeholder="Search rooms"/> */}
       {status==="authenticated"&&  <div className='flex  py-8 px-6  w-full items-center justify-between sm:justify-between flex-col sm:flex-row flex-wrap '>
        <Image decoding='async' src={session?.user?.image as any} width={30} height={30} className='rounded-full ' alt="user image"/>
          <h1 className=' text-[12px] sm:text-sm'>{session?.user?.name}</h1>
          <LogOut aria-label="Logout" size="16" onClick={() => signOut({
            callbackUrl:"/",
          })}/>
        </div>}
        </aside>
  )
}

export default Sidebar;