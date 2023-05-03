"use client"
import { useStore } from "@/store/state"

const ChatLayout = ({ children }:any) => {
    const show = useStore((state:any) => state.show);
   return (
    <section className={`w-full bg-neutral-900 h-full ${show ? "ml-0":"ml-[100px]"}  sm:ml-[230px]  flex-row flex items-center justify-between flex-wrap `}>
      {children}
   
    </section>
   )
}

export default ChatLayout;