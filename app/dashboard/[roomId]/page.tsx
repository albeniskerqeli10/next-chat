
import { prisma } from "@/lib/prisma/prisma";
import MessageForm from '@/app/Form';
import ChatScreen from '@/components/ChatScreen';
import { Suspense } from 'react';
import { getCurrentUser } from '@/auth/session';
import Chat, { Message } from '@/components/Chat/Chat';
import {cache} from 'react'


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
  export const revalidate = 60; // revalidate every hour

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
        if(!room) {
            throw new Error("Room not found");
        }
else {
    return room;

}
    };
    const room = await getRoomById();
       return (
        <div className="h-full w-full flex items-center justify-center flex-row flex-wrap">
        <h1 className="bg-neutral-950 border-b-[1.5px] border-neutral-800 text-white shadow-lg py-4 px-20 w-full">{room?.title}</h1>
<Suspense fallback="Loading...">
<ChatScreen room={room}/>
</Suspense>
    <div className="w-full h-[80px] self-start px-5 sm:px-20 flex mx-auto  align-center justify-center flex-row flex-wrap mt-1 mb-15   sm:my-1">
      <MessageForm roomId={roomId}/>
    </div>
    </div>
    )
}

export default ChatRoom;