
import { prisma } from "@/lib/prisma";
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
        console.error(err, 'Error deleting message');
        return  NextResponse.json({ message: 'Error deleting message' }, { status: 500 });
      }
    }