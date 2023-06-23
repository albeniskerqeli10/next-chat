
import { prisma } from "@/lib/prisma/prisma";
import { NextApiRequest } from "next";
import { NextResponse,NextRequest } from "next/server";
export async function DELETE(request:NextRequest, { params }: { params: { id: string } }) {
const id = parseInt(params.id)
  try{
      if(!id) return NextResponse.json({message:'No Message ID provided'}, {status:400});
      await prisma.message.delete({
        where:{
          id:id 
        }
      }) 
      return NextResponse.json("Message has been successfully" , {status:200});
      
   
      }
      catch(err) {
        return  NextResponse.json({ message: 'Error deleting message' }, { status: 500 });
      }
    }


    export async function PUT(req:Request, { params }: { params: { id: string } }) {
      const data:any= await req.json();
const id = parseInt(params.id)
// req.headers.set['content-type'] = 'application/json';
try{
  if(!id) {
    return NextResponse.json({message:'No Message ID provided'}, {status:400});
  }
  await prisma.message.update({
    where: {
      id:id
    },
    data: {
      //@ts-ignore
      content: data.content
    },
  });
  return NextResponse.json({message:"ChatMessage has been updated successfully"}, {status:200});
}
catch(err) {
  console.log(err);
}


    }

    