"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState, useTransition } from 'react';
import { Send, Camera, Upload , Check, Smile} from 'react-feather';
import { useStore } from '@/store/state';
import EmojiPicker from 'emoji-picker-react';
import Modal from '@/components/UI/Modal';
import Image from 'next/image';
const ComponentId = "MessageForm";
const MessageForm = ({roomId}:number | any) => {
    const {data:session,status} = useSession();
    const [text,setText]  = useState("");
    const [file,setFile] = useState("");
    const [isPending,startTransition] = useTransition()
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
        fileReader.readAsDataURL(e.target.files[0]);
    }
    else {
        alert("Please upload an image");
    }
}
const uploadImage = async(file:any) => {
    try{
        const formData = new FormData();
    formData.append("file",file);
    formData.append("upload_preset",process.env.CLOUDINARY_PRESET as string);
    const res = await fetch("https://api.cloudinary.com/v1_1/albenis/image/upload", {
        method:"POST",
        body:formData
    })
    const data = await res.json();
return data.secure_url;
    }
    catch(err:any) {
        throw new Error("Something went wrong",err);
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
                image:file !== "" ? file: null
            })

        })
        
if(res.ok) {
startTransition(() => {
    router.refresh();
    setFile("");
    setSelectedImg("");
    setText("");

})

}
     }
     else {
        router.push("/login");
     }
}


const submitPhoto = async() => {
    const image = await uploadImage(selectedImg);
    setFile(image as any);
    setToggle(ComponentId, false);
}
const handleEmojiClick = (emoji:any) => {
    setText((text)=> text + String.fromCodePoint(parseInt(emoji.unified, 16)));
    setShowEmojiPicker((showEmojiPicker) => !showEmojiPicker);
}



    return (
        
        <form id="customForm"  onSubmit={handleMessage} method='POST' className="w-full rounded-md bg-neutral-900  py-2 mt-[15px] flex-1 flex items-center justify-between px-3  flex-nowrap lg:flex-wrap flex-row mb-10">
            {showEmojiPicker &&  <div className='absolute right-[80px] mb-[500px]
            '>
                <EmojiPicker height={400} onEmojiClick={handleEmojiClick} width={400}  lazyLoadEmojis={true}/></div>}

        <input placeholder="Write something" onChange={handleText} value={text} type="text" className="bg-transparent w-[90%] inline outline-none" required />
       <div className="w-auto flex gap-2 items-center justify-center flex-nowrap sm:flex-wrap">
       {file !== "" ? <Check aria-label='Check'/>:        <button type="button" onClick={() => setToggle(ComponentId, true)}><Camera aria-label="Camera" size="16"/></button>
}
<button type="button" role="img" className="cursor-pointer"  onClick={() => setShowEmojiPicker((showEmojiPicker) => !showEmojiPicker)}><Smile size="16" aria-label="Smile Emoji"/></button>

        <button type="submit" className="background-transparent"><Send aria-label="Send" size="16"/></button>
        </div>

{toggle && <Modal aria-label="Upload" title="Upload an Image" handleClose={() => setToggle(ComponentId, false)}>
{selectedImg !== "" ?
<>
<div className='w-full px-5 flex'><Image decoding="async" src={selectedImg} width="100" height="100" alt="preview" className="w-full h-[300px] object-cover object-center border-2 border-neutral-700  my-5 shadow-sm "/>
</div>

<div className='w-full py-2 min-h-[60px] flex items-center justify-between px-5 flex-row flex-wrap'>
<button className="bg-blue-700 px-3 py-2 rounded-lg" onClick={submitPhoto}>{isPending ? "Uploading Image":"Submit"}</button>
<button className='bg-red-600 px-3 py-2 rounded-lg' onClick={() => setSelectedImg("")}>Cancel</button>
</div>

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