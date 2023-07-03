"use client"
import { useSession } from "next-auth/react"
import { startTransition, useState } from "react";
import Tippy from '@tippyjs/react';
import {Edit2, MoreVertical, Trash2 as Trash} from 'react-feather'
import 'tippy.js/dist/tippy.css'; 
import 'tippy.js/themes/material.css';

import {useRouter} from 'next/navigation'
import ChatActionsButtons from "./ChatActionsButtons";
import { hideAll } from "tippy.js";
import { useStore } from "@/store/state";
const ChatDeleteBox = ({id,authorId, handleEdit}: any) => {
    const {data:session} = useSession();
const setIsEditable = useStore((state:State | any) => state.setIsEditable);
    const [content,setContent] = useState(<ChatActionsButtons/>)
    const router = useRouter();

    const handleDeleteMessage = async() => {
        const formatedID = parseInt(id as string,10);
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
        <div>
            {/*@ts-ignore */}
{parseInt(session?.user?.id as string,10) === parseInt(authorId,10) ? <Tippy trigger="click" hideOnClick={false} 

onShown={(instance:any) => {
    document?.querySelector('[data-tippy-root]')?.addEventListener('click', event => {
      instance.hide();
    })
  }
}
onShow={(instance)=> {
    hideAll();
}}

maxWidth="500" theme="material"  arrow={false}  content={<ChatActionsButtons handleEdit={handleEdit} handleDelete={ handleDeleteMessage}/>} placement="right" interactive>
    <button><MoreVertical/></button>
    
  </Tippy> 
: null}
        </div>
         

    )
}
export default ChatDeleteBox;


