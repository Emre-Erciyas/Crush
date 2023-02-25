import Link from "next/link";
import styles from "./Menu.module.css"
import "./globals.css"

export default function Menu(){
    return(
        <main className={styles.main}>
            <Link href = "/Game" className={styles.button}>
                Play
            </Link>
            <Link href = "/LeaderBoard" className={styles.button}>
                LeaderBoard
            </Link>
            <Link href = "/Settings" className={styles.button}>
                Settings
            </Link>
        </main>
    )
}