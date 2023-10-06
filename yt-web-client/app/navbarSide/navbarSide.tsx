import { Fragment } from "react";
import styles from './navbarSide.module.css'

export default function NavbarSide() {
    return (
        <div className={styles.navbarSide}>
         

            <p className={styles.title}>
                Subskrybcje
            </p>
            <ul className={styles.list1}>
                
                <li>
                    <button className={styles.listButtonSubs}> 
                    
                        <div className={styles.subDiv}>
                            <img src="noImageUser.png" alt="noImageUser" className={styles.subsImageUser}></img>
                            <p className={styles.userName}>User</p> 
                        </div>
                    </button>
                </li>
                <li>
                    <button className={styles.listButtonSubs}> 
                    
                        <div className={styles.subDiv}>
                            <img src="noImageUser.png" alt="noImageUser" className={styles.subsImageUser}></img>
                            <p className={styles.userName}>User</p> 
                        </div>
                    </button>
                </li>
                <li>
                    <button className={styles.listButtonSubs}> 
                    
                        <div className={styles.subDiv}>
                            <img src="noImageUser.png" alt="noImageUser" className={styles.subsImageUser}></img>
                            <p className={styles.userName}>User</p> 
                        </div>
                    </button>
                </li>
            </ul>
        </div>
    )
}
