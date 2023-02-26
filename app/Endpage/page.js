"use client"
import styles from "./Endpage.module.css"
import {useGlobalScoreBoard} from "../context"

export default function EndPage(){
    const {score} = useGlobalScoreBoard()

    return(
        <main className={styles.main}>
            {sessionStorage.getItem("score")}
        </main>
    )
}