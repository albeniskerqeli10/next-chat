"use client";

import { useSession, signIn, signOut } from "next-auth/react"


const  SignButtons = ({handleSubmit}: any) => {
    const {data:session, status} = useSession();
    // // console.log(session,status);
    return (
        status === "authenticated" ? (
            <>
            <button onClick={() => signOut({
           })}  className='py-3 px-6 m-3 bg-blue-600 rounded-lg'>
             Logout
           </button>
            <button onClick={handleSubmit}>Create a Room</button>
            </>

          ):(
           <button onClick={() => signIn("github" , {
           })}  className='py-3 px-6 m-3 bg-blue-600 rounded-lg'>
             Login
           </button>
          )

    )
}

export default SignButtons;