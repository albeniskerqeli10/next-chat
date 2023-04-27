
import { prisma } from "@/lib/prisma";
import MessageForm from '@/app/Form';
import ChatScreen from '@/components/ChatScreen';
import { Suspense } from 'react';
import { getCurrentUser } from '@/auth/session';
import Chat from '@/components/Chat/Chat';

const message = {
    id: 1, // Replace with actual value
    content: "Hello world!", // Replace with actual value
    // createdAt: new Date(), // Will default to current date and time
    author: "John Doe", // Replace with actual value
    authorId: 123, // Replace with actual value
    room: { id: 456 }, // Replace with actual Room object
    roomId: 456 // Replace with actual value
  };

  type Room = {
    id:number;
    title:string;
    authorId:number;
    author:string,
    messages:Array<string>
  }


  export const revalidate = 3600; // revalidate every hour

const ChatRoom = async({params:{chatId}}:any) => {
    const session = await getCurrentUser();
    const getRoomById = async() => {
        const room = await prisma.room.findUnique({
            where:{
                id:parseInt(chatId)
            },
            include:{
                messages:true
            }
        })
        return room
    }
    const data:any = await getRoomById();
    
    
    //     const createMessage  = async() => {
    //     await fetch("/api/createMessage", {
    //         method:"POST",
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify(message)
    //     })
    // }

       return (
        <div className="h-[100vh] w-full flex items-center justify-center flex-row flex-wrap">
        <h1 className="bg-neutral-900 text-white py-4 px-20 w-full">{data?.title}</h1>
<ChatScreen>
<Suspense fallback="Loading...">
{data?.messages?.map((message:any) => (
    <Chat key={message.id} message={message}/>
        ))}
</Suspense>
</ChatScreen>

    <div className="w-full  h-[80px] px-5 sm:px-20 flex  align-center justify-center flex-row flex-wrap mt-1 mb-15  pt-5 sm:pb-10 sm:my-1">
      <MessageForm roomId={chatId}/>
    </div>
    </div>
    )
}

export default ChatRoom;