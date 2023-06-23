import Modal from "@/components/UI/Modal"
import { useState , startTransition,FormEvent} from "react"
import { useStore } from "@/store/state"
import { useRouter } from "next/navigation"


const AddRoomModal = ({session}:{session:Session}) => {
    const router = useRouter();
    const ComponentId = "sidebar";

    const setToggle = useStore((state:State| any) => state.setToggle);
    const [roomData,setRoomData] = useState({
        title:"",
        owner:""
      })

      const handleChatRoom = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
if (session !== null) {
  try {
    const res = await fetch("/api/room" ,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        title:roomData.title,
        author:roomData.owner,
        authorId:parseInt(session?.user?.id,10),
        messages:[
          {
            content:`Welcome to ${roomData.title} room!`,             
            author:session?.user?.name,
            authorAvatar:session?.user?.image,
            authorId:parseInt(session?.user?.id,10),
            
            
          }
        ]

      })
    })
    if(res.ok) {
      // const id = await res.json().then(data => data.id)
startTransition(() => {
        setToggle(ComponentId,false);
router.refresh();

})
      // router.push(`/dashboard/${id}`);

    }
  }
  catch(err) {
  }
}
else {
  router.push("/login");
}
      }
    

    return <Modal handleClose={() => setToggle(ComponentId, false)}>
<form method='POST' onSubmit={handleChatRoom} className='w-full  min-h-[200px] px-5 gap-2 flex items-start justify-center flex-col flex-wrap'>
<label htmlFor='title' className='py-2 text-sm'>Room Title</label>

<input className='w-full my-2 px-4 py-4 text-xs rounded-sm placeholder-neutral-500 bg-neutral-900' type="text" onChange={(e) => setRoomData({
  ...roomData,
  title:e.target.value
} )} placeholder="Enter room name" required name="title"/>
<label className="py-2 text-sm" htmlFor='owner'>Room Owner</label>
<input className='w-full my-2 text-xs placeholder-neutral-500 px-4 py-4 rounded-sm  bg-neutral-900' onChange={(e) => setRoomData({
  ...roomData,
  owner:e.target.value
})} type="text" placeholder="Enter room owner" required name="owner"/>
<button className='bg-gradient-to-r from-[#1170FF] to-[#002DFF] rounded-sm py-3 w-full my-6'>Create</button>
</form>
</Modal>}

export default AddRoomModal