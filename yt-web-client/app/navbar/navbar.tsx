"use client"

import Image from 'next/image'
import Link from 'next/link'
import SignIn from './signIn'
import { useState } from 'react'
import { User } from 'firebase/auth'
import { onAuthStateChangedHelper } from '../firebase/firebase'
import Upload from './upload'
import styles from './navbar.module.css'

export default function Watch() {

    const [user, setUser] = useState< null | User >(null)

    useState(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        })
        
        return () => unsubscribe()
    })

    return (
        <nav className={styles.navbar}>
            <Link href="/">
                <img className={styles.logo}
                    src={"/youtube-logo.svg"} 
                    alt="youtube-logo" />
            </Link>

            <div className={styles.rightButtons}>
                {
                    user && <Upload />
                }
                <SignIn 
                    user={user}
                />
            </div>
        </nav>
    )

}