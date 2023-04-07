import { Key } from "react"
import ChatDeleteBox from "./ChatDeleteBox"
import Image from "next/image";
type Message = {
    id: Key,
    content:string,
    author:string,
    authorAvatar:string,
}

const Chat = ({message}:{message:Message}) => {
    return (
        <div key={message.id} className="w-full py-3 flex items-start justify-between flex-row flex-nowrap sm:flex-wrap ">
        <div className="flex items-center justify-between flex-nowrap sm:flex-wrap">
        <Image src={message.authorAvatar} alt="ss" width={50} height={50} className="w-[30px] h-[30px] my-1" />
      
      <div className="flex flex-row items-center justify-center flex-nowrap px-3 gap-1">
     <div>
     <h2 className="text-sm  text-neutral-300 font-bold">{message.author}</h2>
      <p className="text-sm inline text-white">
          {message.content}
      </p>
     </div>
          </div>
<ChatDeleteBox id={message.id} avatar={message?.authorAvatar}/>

              </div>
       
          </div>
    )
}

export default Chat;