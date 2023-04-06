"use client"
import {useRef,useEffect} from 'react'
import Image from "next/image";
const ChatScreen = ({children}:any) => {
    
  const messagesEndRef:any = useRef(null)

   const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight - messagesEndRef.current.clientHeight;


  }

  useEffect(() => {
    scrollToBottom();
    // console.log("Scrolling to bottom");



});


    return(
        <div ref={messagesEndRef} className=" overflow-y-scroll w-full px-20 h-[80vh] flex items-center justify-between flex-col flex-wrap">

        <div className="w-full flex items-center justify-center flex-wrap ">
        {/* <h1>Chatting Section</h1> */}
       {children}
    </div>
   
    </div>
    
    )
}

export default ChatScreen;