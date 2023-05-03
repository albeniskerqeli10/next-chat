"use client"
import {useRef,useEffect} from 'react'
import Image from "next/image";
import Chat, { Message } from './Chat/ChatItem';
type MessageRef = {
  current:{
    scrollTop:number,
    scrollHeight:number,
  }
}    
const ChatScreen = ({room}:any) => {

  const messagesEndRef:any = useRef(null)


   const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight - messagesEndRef.current.clientHeight;


  }

  useEffect(() => {
    scrollToBottom();
    // console.log("Scrolling to bottom");



},[room.messages.length]);


    return(
        <div ref={messagesEndRef} className=" overflow-y-scroll overflow-x-hidden w-full  px-5 sm:px-20  h-[78vh] flex items-end justify-between flex-row flex-wrap">

        <div className="w-full flex items-center justify-center flex-wrap flex-row ">
        {/* <h1>Chatting Section</h1> */}
        {room.messages.map((message:Message) => (
    <Chat key={message.id} id={message.id} author={message.author} authorAvatar={message.authorAvatar} content={message.content} image={message.image as any}/>
        ))}
    </div>
   
    </div>
    
    )
}

export default ChatScreen;