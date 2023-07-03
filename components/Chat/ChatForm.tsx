"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState, useTransition } from 'react';
import { Send, Camera, Check, Smile} from 'react-feather';
import { useStore } from '@/store/state';
import EmojiPicker from 'emoji-picker-react';
import AddImageModal from './AddImageModal';
const ComponentId = "MessageForm";
const ChatForm = ({roomId}:{roomId:string}) => {
    const {data:session} = useSession();
    const [text,setText]  = useState("");
    const [file,setFile] = useState("");
    const [isPending,startTransition] = useTransition()
    const [showEmojiPicker,setShowEmojiPicker] = useState(false);
const router = useRouter();
const toggle = useStore((state:State | any) => state.modals[ComponentId]);
const setToggle = useStore( (state:State | any) => state.setToggle);


const handleText = (e:ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
}
     const handleMessage  = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      if(session !== null) {
        console.log(file,'FILE');
       const res =await fetch("/api/message", {      
            method:"POST",
             headers:{
        "Content-Type":"application/json"           },
            body:JSON.stringify({
                 author:session?.user?.name,
               authorId:parseInt(session?.user?.id as string,10),
                authorAvatar:session?.user?.image,
                roomId:roomId,
                content:text,
               image:file !== "" ? file: null
            })

        })
        
if(res.ok) {
startTransition(() => {
    router.refresh();
    setFile("");
    setText("");

 })

 }
      }
     else {
        router.push("/login");
      }
 }

const handleEmojiClick = (emoji:any) => {
    setText((text)=> text + String.fromCodePoint(parseInt(emoji.unified, 16)));
    setShowEmojiPicker((showEmojiPicker) => !showEmojiPicker);
}



    return (
        
        <form id="customForm" onSubmit={handleMessage} method='POST' className="w-full rounded-md bg-neutral-950  py-2 mt-[15px] flex-1 flex items-center justify-between px-3  flex-nowrap lg:flex-wrap flex-row mb-10">
            {showEmojiPicker &&  <div className='absolute right-[80px] mb-[500px]
            '>
                <EmojiPicker height={400} onEmojiClick={handleEmojiClick} width={400}  lazyLoadEmojis={true}/></div>}

        <input placeholder="Write something" onChange={handleText} name="content" value={text} type="text" className="bg-transparent w-[90%] inline outline-none" required />
       <div className="w-auto flex gap-2 items-center justify-center flex-nowrap sm:flex-wrap">
       {file !== "" ? <Check aria-label='Check'/>:        <button type="button" onClick={() => setToggle(ComponentId, true)}><Camera aria-label="Camera" size="16"/></button>
}
{toggle && <AddImageModal file={file} setFile={setFile}/>}

<button type="button" role="img" className="cursor-pointer"  onClick={() => setShowEmojiPicker((showEmojiPicker) => !showEmojiPicker)}><Smile size="16" aria-label="Smile Emoji"/></button>

        <button type="submit" className="background-transparent"><Send aria-label="Send" size="16"/></button>
        </div>

    </form>
    )
    }

export default ChatForm;