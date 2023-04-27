import { Key } from "react"
import ChatDeleteBox from "./ChatDeleteBox"
import Image from "next/image";
export type Message = {
    id: Key,
    content:string,
    author:string,
    authorAvatar:string,
image?:String,
}

const Chat = ({message}:{message:Message}) => {
    return (
        <div key={message.id} className="w-full py-3 flex items-start justify-between flex-row flex-nowrap sm:flex-wrap ">
        <div className="flex items-start justify-between flex-nowrap sm:flex-wrap">
        <Image src={message.authorAvatar} alt="ss" width={50} height={50} className="w-[30px] rounded-full h-[30px] my-1" />
      
      <div className="flex flex-row items-start justify-start flex-nowrap px-3 gap-1">
     <div>
     <h2 className="text-sm  text-neutral-300 font-bold">{message.author}</h2>
      <p className="text-sm inline text-white">
          {message.content}
      </p>
{message.image && <Image className="w-full border border-neutral-700 my-5 shadow-sm  object-center max-w-full object-cover h-[300px]" width="200" height="300" src={message?.image as any} alt="chat image"/>
}
     </div>
          </div>
<ChatDeleteBox id={message.id} avatar={message?.authorAvatar}/>

              </div>
       
          </div>
    )
}

export default Chat;