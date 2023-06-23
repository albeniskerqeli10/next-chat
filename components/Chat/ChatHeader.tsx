"use client"
import { Menu } from "react-feather"
import {useStore} from '@/store/state';
const ChatHeader = ({title}:{title:string}) => {
    const setShow = useStore((state:State | any) => state.setShow);
    return(
        <div className="w-full border-neutral-800 border-b-[1.5px] text-white shadow-lg py-4 px-10 sm:px-20 bg-neutral-950  flex items-center justify-start gap-3 flex-nowrap">
        <button onClick={() => setShow((show:boolean) => !show)}><Menu className="flex sm:hidden"/></button>
       <h1 className=" ">{title}</h1>
       </div>
    )
}

export default ChatHeader;