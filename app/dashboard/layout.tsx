import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import Image from "next/image";
import { Send } from "react-feather";
import {getServerSession } from "next-auth";
import { getCurrentUser } from "@/auth/session";
import { prisma } from "@/lib/prisma/prisma";
import { Suspense } from "react";

type ServerSession = {
    name: string;
    email: string;
    image: string;
}

export const revalidate = 3600; // revalidate every hour

const Dashboard = async({children}:any) => {
    // const session = await getCurrentUser();
    
  const getRooms = async() => {
    const rooms = await prisma.room.findMany({
      select: {
        id: true,
        title: true,
        authorId:true,
      },
    });
    return rooms

  }

  const data:any = await getRooms();
      
return(
<main className="w-full  h-full flex items-center justify-center flex-wrap flex-row">
<Suspense fallback="Loading..">
<Sidebar rooms={data}/>

  </Suspense>
  <section className="w-full bg-neutral-900 h-full  sm:ml-[230px]  flex-row flex items-center justify-between flex-wrap  ">
      {children}
    {/* <div className="w-full flex self-end align-center justify-center flex-row flex-wrap py-2 my-4">
        <form className="w-full rounded-md bg-neutral-700 py-2 flex-1 flex items-center justify-between px-3 flex-wrap flex-row">
            <input type="text" className="bg-transparent w-[90%] outline-none" />
            <button className="background-transparent"><Send size="16"/></button>
        </form>
    </div> */}
    </section>


</main>
    )
}

export default Dashboard;

