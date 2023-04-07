"use client";
import { GitHub as GithubIcon } from "react-feather";
import GoogleIcon from "@/components/Icons/GoogleIcon";
import {signIn, useSession} from "next-auth/react"
import { useEffect } from "react";
import { redirect } from 'next/navigation';

const Login = () => {
    
    const {data:session} = useSession();
    useEffect(() => {
        if(session) {
            redirect("/dashboard");
        }  
    },[session])
    // useEffect(() => {
    //     if(session !== null) {
    //         window.location.href="/dashboard"
    //     }

    // },[session])
    return (
         <section className="bg-neutral-900 w-full flex items-center justify-center min-h-[100vh] flex-wrap flex-row">
            <div className="w-[330px] bg-neutral-950 min-h-[400px] flex items-center justify-center flex-col flex-wrap ">
               <div className="max-w-[80%] flex items-center justify-center flex-col flex-wrap gap-10">
               <h1 className="py-3 m-[0, auto] text-white text-lg text-center ">Sign in using these providers</h1>
                <button onClick={() => signIn
                ("github" , {
                    callbackUrl:"/dashboard"
                })} className="bg-neutral-900 rounded-sm hover:bg-gradient-to-r from-[#1170FF] to-[#002DFF] hover:transition-all text-white shadow-md w-full px-5 py-4 flex items-center justify-center flex-row gap-5"><GithubIcon color="white"/>  Continue with Github</button>
                <button onClick={() => signIn("google")} className="bg-neutral-900 rounded-sm hover:bg-gradient-to-r from-[#1170FF] to-[#002DFF] hover:transition-all shadow-md w-full px-5 py-4 flex items-center text-white justify-center flex-row gap-5"><GoogleIcon/>Continue with Google</button>
               </div>
                </div>
        </section>
    )
}

export default Login;