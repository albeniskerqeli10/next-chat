import { prisma } from "@/lib/prisma";

const message = {
  id: 1, // Replace with actual value
  content: "Hello world!", // Replace with actual value
  // createdAt: new Date(), // Will default to current date and time
  author: "John Doe", // Replace with actual value
  authorId: 123, // Replace with actual value
  room: { id: 2 }, // Replace with actual Room object
  roomId: 2 // Replace with actual value
};

const createMessage = async(req:any,res:any) => {
    if(req.method === "POST") {
      
      const message = await prisma.message.create({
        data:{
          content: req.body.content,
          author:req.body.author,
          authorId:req.body.authorId,
                  //@ts-ignore
          authorAvatar:req.body.authorAvatar,
          room:{
            connect:{
              id:parseInt(req.body.roomId)
            }
          },          
     

        }
      })
      res.status(200).json(message);
  
    }
  }
  export default createMessage;