"use client"
import styles from "./Endpage.module.css"
import "../globals.css"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function EndPage(){
    const [score, setScore] = useState("")
    useEffect(()=>{
        if(typeof window !== 'undefined') setScore(sessionStorage.getItem("score"))
    })
    return(
        <main className={styles.main}>
            <div className={styles.score}>
                {score === "" ? "": `Your score: ${score}`}
            </div>
            <div className={styles.buttons}>
                <Link href = "/Game" className={styles.button}>
                    Try again
                </Link>
                <Link href = "/" className={styles.button}>
                    Main Menu
                </Link>
            </div>
        </main>
    )
}