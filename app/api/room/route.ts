import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(request:Request) {
    const data:any= await request.json(); 

    try{
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
                  return NextResponse.json(room , {status:200});
    }
    catch(err) {
        console.log(err);
    }
}

