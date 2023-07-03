"use client"
import Modal from "../UI/Modal"
import Image from 'next/image';
import { useState , startTransition,FormEvent,ChangeEvent,useTransition} from "react";
import { useStore } from "@/store/state";
import { Upload } from "react-feather";
import { uploadDirect  } from '@uploadcare/upload-client'
const ComponentId = "MessageForm";
const AddImageModal = ({file,setFile}:any) => {
    const [selectedImg,setSelectedImg] = useState("");
    const [fileInp,setFileInp] = useState<any>("");
    const setToggle = useStore((state:State | any) => state.setToggle);
    // const [imgUrl,setImgUrl] = useState("");
const uploadImg = async() => {
    if(fileInp !== "") {
        const result = await uploadDirect(fileInp, {
            publicKey: process.env.UPLOADCARE_PUBLIC_KEY as string,
            store: 'auto',
           
          })
         setFile(result.cdnUrl as any);

          setToggle(ComponentId, false);
    }
}

    const handleMedia = (e:FormEvent<HTMLInputElement> | any ) => {
        if(e?.currentTarget?.files[0]?.type?.match("image.*")) {
            setFileInp(e?.currentTarget?.files[0]);
            const fileReader= new FileReader();
            fileReader.onload = (e) => {
                    setSelectedImg(e?.target?.result as string);
            }
            fileReader.readAsDataURL(e?.currentTarget?.files[0]);
        }
        else {
            alert("Please upload an image");
        }
    }
    return (
        <Modal aria-label="Upload" title="Upload an Image" handleClose={() => setToggle(ComponentId, false)}>
{selectedImg !== "" ?
<>
<div className='w-full px-5 flex'><Image decoding="async" src={selectedImg} width="100" height="100" alt="preview" className="w-full h-[300px] object-cover object-center border-2 border-neutral-700  my-5 shadow-sm "/>
</div>

<div className='w-full py-2 min-h-[60px] flex items-center justify-between px-5 flex-row flex-wrap'>
<button className="bg-blue-700 px-3 py-2 rounded-lg" onClick={uploadImg}>Submit</button>
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
    </Modal>
)}
export default AddImageModal;