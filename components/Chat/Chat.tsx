import { memo } from "react"
import ChatDeleteBox from "./ChatDeleteBox"
import Image from "next/image";
export type Message = {
    id: string | number,
    content:string,
    author:string,
    authorAvatar:string,
image?:String ,
}

const Chat = ({id,authorAvatar,content,image,author}:Message) => {
    return (
        <div key={id} className="w-full   py-3 flex items-start justify-between flex-row flex-nowrap sm:flex-wrap ">
        <div className="flex items-start justify-between flex-nowrap sm:flex-wrap">
        <Image src={authorAvatar} decoding="async" alt="ss" width={50} height={50} className="w-[30px] rounded-full h-[30px] my-1" />
      
      <div className="flex flex-row items-start justify-start flex-nowrap px-3 gap-1">
     <div className="w-[200px] md:w-full text-ellipsis  ">
     <h2 className="text-sm  text-neutral-300 font-bold">{author}</h2>
      <p className="text-sm  text-white">
          {content}
      </p>
{image && <Image decoding="async"  className="w-full border border-neutral-700 my-5 shadow-sm  object-center max-w-full object-cover h-[300px]" width="200" height="300" src={image as any} alt="chat image"/>
}
     </div>
          </div>
<ChatDeleteBox id={id} avatar={authorAvatar}/>

              </div>
       
          </div>
    )
}

export default memo(Chat);