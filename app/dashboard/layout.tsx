import ChatLayout from "@/components/Chat/ChatLayout";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { prisma } from "@/lib/prisma/prisma";
import { Suspense } from "react";

type ServerSession = {
    name: string;
    email: string;
    image: string;
}

export const revalidate = 3600; // revalidate every hour

const Dashboard = async({children}:any) => {
    
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
  <ChatLayout>
    {children}
  </ChatLayout>


</main>
    )
}

export default Dashboard;

