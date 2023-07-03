import { memo, startTransition, useState } from "react"
import ChatActions from "./ChatActions"
import Image from "next/image";
import { useRouter } from "next/navigation";

// const EditChat = ({isEditable,handleEditMessage,content}:any) => {
// }

    




const Chat = ({id,authorAvatar,content,image,author, authorId}:Message) => {
    const [isEditable,setIsEditable] = useState(false);
    const router = useRouter();
    const handleEditMessage = async(e:any) => {
        e.preventDefault();
            const formatedID = parseInt(id as string,10);
           try{
            const res = await fetch(`/api/message/${formatedID}`, {
                method:"PUT",
                body:JSON.stringify({
                    content:"Asterisk!"
                }),
                
                headers: {
                    'Content-Type': 'application/json'
                }
,
            })
            if(res.ok) {
startTransition(() => {
    router.refresh();

})
            }
        }
        catch(err) {
            console.log(err,'ERR!');
        }
           }
    
    return (
        <div key={id} className="w-full   py-3 flex items-start justify-between flex-row flex-nowrap sm:flex-wrap ">
        <div className="flex items-start justify-start flex-wrap sm:flex-nowrap">
        <div className="w-auto flex items-start justify-center flex-row flex-nowrap">
        <Image src={authorAvatar} decoding="async" alt="ss" width={50} height={50} className="w-[30px] rounded-full h-[30px] my-1" />
      
      <div className="flex flex-row items:center sm:items-start justify-start flex-wrap px-3 gap-1">
     <div className="w-[200px] md:w-full flex-col text-ellipsis flex-nowrap flex  ">
     <h2 className="text-sm  text-neutral-300 font-bold">{author}</h2>
     <p className="text-sm  text-white">
          {content}
      </p>
            </div>
{image && <Image decoding="async"  className="w-[400px] max-w-full object-cover object-center max-h-full h-full  border border-neutral-700 my-5 shadow-sm " width="400" height="400" src={image as string} alt="chat image"/>

}
     </div>
          </div>
<ChatActions key={id} id={id} handleEdit={() => {
    setIsEditable(!isEditable);
}} authorId={authorId}/>

              </div>
       
          </div>
    )
}

export default memo(Chat);