"use client"
import { useStore } from "@/store/state"
import { ReactNode } from "react";

const ChatLayout = ({ children }:{children:ReactNode}) => {
    const show = useStore((state:State | any) => state.show);
   return (
    <section className={`w-full bg-neutral-900 h-full ${show ? "ml-0":"ml-[100px]"}  sm:ml-[230px]  flex-row flex items-center justify-between flex-wrap `}>
      {children}
   
    </section>
   )
}

export default ChatLayout;