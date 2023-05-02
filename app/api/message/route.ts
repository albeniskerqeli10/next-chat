import { prisma } from "@/lib/prisma/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    try{
      const data:any= await request.json();
    const message = await prisma.message.create({
      data:{
        content: data.content,
        author:data.author,
        authorId:data.authorId,
                //@ts-ignore
        authorAvatar:data.authorAvatar,
        image:data.image,
        room:{
          connect:{
            id:parseInt(data.roomId)
          }
        },          

      }
    }) 
    return NextResponse.json(message , {status:200});
    }
    catch(err) {
      console.log(err)
    }
    
}


    // export async function DELETE(request:NextApiRequest) {
    //   try{
    //     const data:any= request.query;
    //     console.log(data);
    //   const message = await prisma.message.delete({
    //     where:{
    //       id:parseInt(data.id)
    //     }
    //   }) 
    //   return NextResponse.json(message , {status:200});
    //   }
    //   catch(err) {
    //     console.log(err)
    //   }
    // }