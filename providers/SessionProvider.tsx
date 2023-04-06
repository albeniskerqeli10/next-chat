"use client"

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';


const GithubSessionProvider = ({children}:{children:ReactNode}) => {
    return(
        <SessionProvider>
            {children}
        </SessionProvider>

    )
}

export default GithubSessionProvider;