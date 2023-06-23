"use client"
import {useRef,useEffect} from 'react'
import Chat from './Chat/ChatItem';
import { useRouter } from 'next/navigation';
type MessageRef = {
  current:{
    scrollTop:number,
    scrollHeight:number,
    clientHeight:number
  }
}    
const ChatScreen = ({room}:{room:Room}) => {

  const messagesEndRef:any = useRef(null)
  const router = useRouter();


   const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight - messagesEndRef.current.clientHeight;


  }

  useEffect(() => {
    console.log('Rerendered');
    scrollToBottom();
    router.refresh();
    // console.log("Scrolling to bottom");



},[room?.messages?.length,router]);






    return(
        <div ref={messagesEndRef} className=" overflow-y-scroll overflow-x-hidden w-full  px-5 sm:px-20  h-[78vh] flex items-end justify-between flex-row flex-wrap">

        <div className="w-full flex items-center justify-center flex-wrap flex-row ">
        {/* <h1>Chatting Section</h1> */}
        {room?.messages?.map((message:Message) => (
    <Chat key={message.id} id={message.id} author={message.author} authorAvatar={message.authorAvatar} authorId={message.authorId} content={message.content} image={message.image }/>
        ))}
    </div>
   
    </div>
    
    )
}

export default ChatScreen;