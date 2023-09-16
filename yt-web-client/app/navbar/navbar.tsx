"use client"

import Image from 'next/image'
import Link from 'next/link'
import SignIn from './signIn'
import { useState } from 'react'
import { User } from 'firebase/auth'
import { onAuthStateChangedHelper } from '../firebase/firebase'
import Upload from './upload'

export default function Watch() {

    const [user, setUser] = useState< null | User >(null)

    useState(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        })
        
        return () => unsubscribe()
    })

    return (
        <nav>
            <Link href="/">
                <Image
                    width={120}
                    height={40}
                    src={"/youtube-logo.svg"} 
                    alt="youtube-logo" />
            </Link>
            {
                user && <Upload />
            }
            <SignIn 
                user={user}
            />
        </nav>
    )

}