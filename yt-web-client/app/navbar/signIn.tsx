import { Fragment } from "react";
import styles from './signIn.module.css'
import { signInWithGoogle, signOut } from "../firebase/firebase";
import { User } from "firebase/auth";
import { useState } from "react";

interface SignInProps {
    user: User | null;
}

export default function SignIn({ user }: SignInProps) {

    const [isOpened, setIsOpened] = useState(false);

    function changeState(){
        setIsOpened(!isOpened);
    }

    return(
        <Fragment>
            
            
            {
                user ?
                    <>
                            <button className={styles.userButton} onClick={() => changeState()}>
                            <img src="noImageUser.png" alt="IMG" className={styles.userImg} />
                            </button>
                            {
                                isOpened ?
                                    <div className={styles.userList}>
                                        <div className={styles.firstSection}>
                                            <img src="noImageUser.png" alt="IMG" className={styles.userImg} />
                                            <div className={styles.firstSectionRight}>
                                                <p>UserName</p>
                                            </div>
                                        </div>
                                        <button className={styles.sgn_button} onClick={signOut}>
                                        Wyloguj się
                                        </button>
                                    </div> 
                                : 
                                    null
                            }
                    </>
                    :
                    <button className={styles.sgn_button} onClick={signInWithGoogle}>
                        Sign In
                    </button>   
                    
            }
        </Fragment>
    )

}