
import { prisma } from "@/lib/prisma/prisma";
import { NextApiRequest } from "next";
import { NextResponse,NextRequest } from "next/server";

export async function GET(request:NextRequest , {params}:{params:{id:string}}) {
  const id = parseInt(params.id)
  try{
    if(!id) return NextResponse.json({message:'No Message ID provided'}, {status:400});
    const room = await prisma.room.findUnique({
      where:{
        id:id
      },
      include:{
          messages:true
      }
    }) 
    return NextResponse.json(room, {status:200});
  }
  catch(err) {
    console.log(err);
    return  NextResponse.json({ message: 'Error getting message' }, { status: 500 });
  }
} 

export async function DELETE(request:NextRequest, { params }: { params: { id: string } }) {
const id = parseInt(params.id)
  try{
      if(!id) return NextResponse.json({message:'No Message ID provided'}, {status:400});
      await prisma.room.delete({
        where:{
          id:id 
        },
        include:{
            messages:true
        }
      }) 
      return NextResponse.json("Message has been successfully" , {status:200});
      
   
      }
      catch(err) {
        console.log(err);
        return  NextResponse.json({ message: 'Error deleting message' }, { status: 500 });
      }
    }