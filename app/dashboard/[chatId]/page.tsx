
import Image from 'next/image';
import { Send, Trash } from 'react-feather';
import { prisma } from "@/lib/prisma";
import MessageForm from '@/app/Form';
import ChatScreen from '@/components/ChatScreen';
import { Suspense } from 'react';
import { getCurrentUser } from '@/auth/session';
import ChatDeleteBox from '@/components/Chat/ChatDeleteBox';

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
        <>
        <h1 className="bg-neutral-900 py-4 px-20 w-full">{data?.title}</h1>
<ChatScreen>
<Suspense fallback="Loading...">
{data?.messages?.map((message:any) => (
    
            <div key={message.id} className="w-full py-3 flex items-start justify-start flex-row flex-wrap">
            <Image src={message.authorAvatar} alt="ss" width={50} height={50} className="w-[30px] h-[30px] my-1" />
        
                <div className="flex flex-row items-start justify-center flex-wrap px-3 gap-1">
               <div>
               <h2 className="text-sm  text-neutral-300 font-bold">{message.author}</h2>
                <p className="text-sm inline">
                    {message.content}
                </p>
               </div>
 <ChatDeleteBox id={message.id} avatar={message?.authorAvatar}/>

                </div>
         
            </div>
        ))}
</Suspense>
</ChatScreen>

    <div className="w-full px-20 flex self-end align-center justify-center flex-row flex-wrap py-4 my-1">
      <MessageForm roomId={chatId}/>
    </div>
    </>
    )
}

export default ChatRoom;