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
                                        <button className={styles.sgn_button} onClick={signOut}>
                                        Sign Out
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