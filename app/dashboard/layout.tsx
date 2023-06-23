import ChatLayout from "@/components/Chat/ChatLayout";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { prisma } from "@/lib/prisma/prisma";
import { ReactNode, Suspense } from "react";

type ServerSession = {
    name: string;
    email: string;
    image: string;
}

export const revalidate = 3600; // revalidate every hour

const Dashboard = async({children}:{children:ReactNode}) => {
    
  
  const getRooms = async() => {
    const rooms = await prisma.room.findMany({
      select: {
        id: true,
        title: true,
        authorId:true,
        author:true,
      },
    });
    return rooms

}

  const data:Rooms | any = await getRooms();
  
      
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

