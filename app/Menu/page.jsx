import Link from "next/link";
import styles from "./Menu.module.css"
import "../globals.css"
import {AiFillPlayCircle} from "react-icons/ai"
import {MdLeaderboard} from "react-icons/md"
import {AiTwotoneSetting} from "react-icons/ai"
export default function Menu(){
    return(
        <main className={styles.main}>
            <Link href = "/Game" className={styles.button}>
                <span className ={styles.icon}><AiFillPlayCircle/></span>Play
            </Link>
            <Link href = "/Leaderboard" className={styles.button}>
                <span className ={styles.icon}><MdLeaderboard/></span>LeaderBoard
            </Link>
            <Link href = "/Settings" className={styles.button}>
                <span className ={styles.icon}><AiTwotoneSetting/></span>Settings
            </Link>
        </main>
    )
}