type Message = {
    id: string | number,
    content:string,
    author:string,
    authorAvatar:string,
image?:String ,
authorId:string,
}
type Messages = Array<Message>

type Room = {
    id: string | number;
    title:string;
    authorId:number;
    author:string,
    messages?:Message[],
  }
type Rooms = Array<Room>

type RoomParams = {
    params:{
        roomId:Room["id"]
    }
}


type State = {
    modals:object,
    toggle:boolean;
    showSidebar:boolean;
    isEditable:boolean;
    show:boolean;
    setShow:() => void;
}

type Modal = {
    id:String,
    isOpen:boolean
}

type Session = {
    user:{
        id:string,
    name:string,
    image:string,
    email:string
    }
  
}