"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState, useTransition, startTransition } from 'react';
import { Send, Camera, Upload , Check} from 'react-feather';
import { useStore } from '@/store/state';
import EmojiPicker from 'emoji-picker-react';
import Modal from '@/components/UI/Modal';
import Image from 'next/image';

const ComponentId = "MessageForm";
const MessageForm = ({roomId}:number | any) => {
    const {data:session,status} = useSession();
    const [text,setText]  = useState("");
    const [file,setFile] = useState("");
    const [selectedImg,setSelectedImg] = useState("");
    const [showEmojiPicker,setShowEmojiPicker] = useState(false);
const router = useRouter();
const toggle = useStore((state:any) => state.modals[ComponentId]);
const setToggle = useStore( (state:any) => state.setToggle);


const handleText = (e:ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
}
const handleMedia = (e:ChangeEvent<HTMLInputElement> | any) => {
    if(e.target.files[0].type.match("image.*")) {
        const fileReader= new FileReader();
        fileReader.onload = (e) => {
                setSelectedImg(e?.target?.result as any);
        }
        fileReader.readAsDataURL(e?.target?.files[0]);
    }
    else {
        alert("Please upload an image");
    }
}
    const handleMessage  = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
     if(session !== null) {
        const res =await fetch("/api/message", {
            
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                author:session?.user?.name,
                authorId:1234,
                authorAvatar:session?.user?.image,
                roomId:roomId,
                content:text,
                image:file !== "" ? file : null
            })

        })
        console.log(res)
if(res.ok) {
    router.refresh();
    setFile("");
    setSelectedImg("");
    setText("");

}
        // console.log('message created successfully');
     }
     else {
        router.push("/login");
     }
}


const submitPhoto = () => {
    setFile(selectedImg);
    setToggle(ComponentId, false);
}
const handleEmojiClick = (emoji:any) => {
    setText((text)=> text + String.fromCodePoint(parseInt(emoji.unified, 16)));
    setShowEmojiPicker((showEmojiPicker) => !showEmojiPicker);
}

    return (
        
        <form id="customForm"  onSubmit={handleMessage} method='POST' className="w-full rounded-md bg-neutral-700 border-2 border-red-500 py-2  flex-1 flex items-center justify-between px-3 flex-nowrap sm:flex-wrap flex-row mb-10">
            {showEmojiPicker &&  <div className='absolute right-[80px] mb-[500px]
            '>
                <EmojiPicker height={400} onEmojiClick={handleEmojiClick} width={400}  lazyLoadEmojis={true}/></div>}

        <input placeholder="Write something" onChange={handleText} value={text} type="text" className="bg-transparent w-[90%] inline outline-none" required />
        {file !== "" ? <Check/>:        <button type="button" onClick={() => setToggle(ComponentId, true)}><Camera size="16"/></button>
}
<span role="img"  onClick={() => setShowEmojiPicker((showEmojiPicker) => !showEmojiPicker)}>🙂</span>

        <button type="submit" className="background-transparent"><Send size="16"/></button>

{toggle && <Modal title="Upload an Image" handleClose={() => setToggle(ComponentId, false)}>
{selectedImg !== "" ?

<><Image src={selectedImg} width="100" height="100" alt="preview" className="w-full h-[300px] object-cover object-center"/>

<button onClick={submitPhoto}>Submit</button>
<button onClick={() => setSelectedImg("")}>Remove</button>

</>:
<>
  <div className="relative flex items-center justify-center flex-row m-0">
  <input onChange={handleMedia
} type="file" name='file' id="file"  />
  <Upload size="44" className='mb-[0px] absolute self-center'/>
  </div>
  </>
}
    </Modal>}
    </form>
    )
    }

export default MessageForm