import {prisma} from "@/lib/prisma";

// create a new post using prisma 
const exampleChatRoom:any  = {
    id:123,
    title:"Football Enjoyers",
    author : "Dan Abramov",
    authorId: 123,
    messages:[
      {
        content:"What a match we had today, Bayern is the best team in the world",
        author: "Axel",
        authorId:345,
        room:null,
        roomId:123,
  
      }
    ]
  
  
  }
 const createPost = async (req:any, res:any) => {
  // title:"Programmers",
  // author:"Albenis Kerqeli",
  // authorId:87654321
  
if(req.method === "POST") {
  const data= req.body;
  const room = await prisma.room.create({
    data: {
      title: data.title,
      members: data.members,
      author: data.author,
      authorId: data.authorId,
      messages: {
        create: data.messages
          
        
      }
    },
    include: {
      messages: true
    }
  });
    
    res.status(200).json(room , )
}
}

export default createPost;
