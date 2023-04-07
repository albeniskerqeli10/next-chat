"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState, useTransition, startTransition } from 'react';
import { Send } from 'react-feather';

import EmojiPicker from 'emoji-picker-react';


const message = {
    id: 1, // Replace with actual value
    content: "Hello world!", // Replace with actual value
    // createdAt: new Date(), // Will default to current date and time
    author: "John Doe", // Replace with actual value
    authorId: 123, // Replace with actual value
    roomId: 456 // Replace with actual value
  };


const MessageForm = ({roomId}:number | any) => {
    const {data:session,status} = useSession();
    const [text,setText]  = useState("");
    const [showEmojiPicker,setShowEmojiPicker] = useState(false);
const router = useRouter();

const handleText = (e:ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
}


    const handleMessage  = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
     if(session !== null) {
        await fetch("/api/message", {
            
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                author:session?.user?.name,
                authorId:1234,
                authorAvatar:session?.user?.image,
                roomId:roomId,
                content:text
            })

        })
        router.refresh();
        startTransition(() => {

        setText("");
        })
        // console.log('message created successfully');
     }
    }

// const handleSubmit = (e:FormEvent) => {
//     e.preventDefault();
//     createMessage();
//     console.log("Message sent");

// }
const handleEmojiClick = (emoji:any) => {
    setText((text)=> text + String.fromCodePoint(parseInt(emoji.unified, 16)));
    setShowEmojiPicker((showEmojiPicker) => !showEmojiPicker);
}

    return (
        
        <form onSubmit={handleMessage} className="w-full rounded-md bg-neutral-700 border-2 border-red-500 py-2  flex-1 flex items-center justify-between px-3 flex-nowrap sm:flex-wrap flex-row mb-10">
            {showEmojiPicker &&  <div className='absolute right-[80px] mb-[500px]
            '>
                <EmojiPicker height={400} onEmojiClick={handleEmojiClick} width={400}  lazyLoadEmojis={true}/></div>}

        <input placeholder="Write something" onChange={handleText} value={text} type="text" className="bg-transparent w-[90%] inline outline-none" required />
        <button className="background-transparent"><Send size="16"/></button>
<span role="img"  onClick={() => setShowEmojiPicker((showEmojiPicker) => !showEmojiPicker)}>🙂</span>
    </form>
    )
    }

export default MessageForm