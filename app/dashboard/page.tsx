// import RightContent from "@/components/Dashboard/RightContent";
// import Image from "next/image";
// import { Send } from "react-feather";
// import {getServerSession } from "next-auth";
// import { getCurrentUser } from "@/auth/session";
// import { PrismaClient } from "@prisma/client";
// type ServerSession = {
//     name: string;
//     email: string;
//     image: string;
// }
 const Dashboard = () => {
//     const session = await getCurrentUser();
    
//   const getRooms = async() => {
//     const prisma = new PrismaClient();
//     const rooms = await prisma.room.findMany();
//     return rooms

//   }

//   const data = await getRooms();
// //   console.log(data,"Data");
    
return(
<div className="w-full min-h-[100vh] flex items-center justify-center flex-wrap flex-row">
<h1 className="text-2xl">Select a Channel to get started chatting 🎉</h1>
</div>
    )
}
//w-full   min-h-[100vh] flex items-center justify-center flex-wrap flex-row

export default Dashboard;

