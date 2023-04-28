
import { prisma } from "@/lib/prisma";
import MessageForm from '@/app/Form';
import ChatScreen from '@/components/ChatScreen';
import { Suspense } from 'react';
import { getCurrentUser } from '@/auth/session';
import Chat, { Message } from '@/components/Chat/Chat';



  type Room = {
    id:string;
    title:string;
    authorId:number;
    author:string,
    messages:Array<string>
  }

type RoomParams = {
    params:{
        roomId:Room["id"]
    }
}
  export const revalidate = 3600; // revalidate every hour

const ChatRoom = async({params:{roomId}}:RoomParams) => {
    // const session = await getCurrentUser();
    const getRoomById = async() => {
        const room = await prisma.room.findUnique({
            where:{
                id:parseInt(roomId)
            },
            include:{
                messages:true
            }
        })
        return room;
    }
    const room = await getRoomById();
       return (
        <div className="h-full w-full flex items-center justify-center flex-row flex-wrap">
        <h1 className="bg-neutral-900 text-white py-4 px-20 w-full">{room?.title}</h1>
<ChatScreen>
<Suspense fallback="Loading...">
{room?.messages?.map((message) => (
    <Chat key={message.id} id={message.id} author={message.author} authorAvatar={message.authorAvatar} content={message.content} image={message.image as any}/>
        ))}
</Suspense>
</ChatScreen>

    <div className="w-full h-[80px] self-start px-5 sm:px-20 flex mx-auto  align-center justify-center flex-row flex-wrap mt-1 mb-15   sm:my-1">
      <MessageForm roomId={roomId}/>
    </div>
    </div>
    )
}

export default ChatRoom;