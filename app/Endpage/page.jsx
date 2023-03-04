"use client"
import styles from "./Endpage.module.css"
import "../globals.css"
import { useEffect, useState } from "react"
import Link from "next/link"
import { AiFillHome } from "react-icons/ai"
import {GrRefresh} from "react-icons/gr"

export default function EndPage(){
    const [score, setScore] = useState("")
    useEffect(()=>{
        if(typeof window !== 'undefined') setScore(sessionStorage.getItem("score"))
    })
    return(
        <main className={styles.main}>
            <div className={styles.score}>
                {score === "" ? "": `Your score is ${score}`}
            </div>
            <div className={styles.buttons}>
                <Link href = "/Game" className={styles.button}>
                <span className ={styles.icon}><GrRefresh/></span>Try again
                </Link>
                <Link href = "/" className={styles.button}>
                    <span className ={styles.icon}><AiFillHome/></span>Main Menu
                </Link>
            </div>
        </main>
    )
}