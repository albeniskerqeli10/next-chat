"use client"
import { useSession } from "next-auth/react"
import { startTransition, useEffect } from "react";
import { Trash2 as Trash } from "react-feather";
import {useRouter} from 'next/navigation'
const ChatDeleteBox = ({id,avatar}:any) => {
    const {data:session} = useSession();

    const router = useRouter();

    const handleDeleteMessage = async(id:any) => {
        const formatedID = parseInt(id,10);
           try{
            const res = await fetch(`/api/message/${formatedID}`, {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
            })
            if(res.ok) {
startTransition(() => {
    router.refresh();

})
            }
        }
        catch(err) {
        }
           }
    

    return (
       session?.user?.image === avatar ? <button className="py-2 px-5 " onClick={() => handleDeleteMessage(id)}><Trash aria-label="Delete" color="white"/></button>: <></>
         

    )
}
export default ChatDeleteBox;