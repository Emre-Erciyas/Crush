"use client"
import styles from "./Endpage.module.css"
import "../globals.css"
import { useEffect, useState } from "react"
import Link from "next/link"
import { AiFillHome } from "react-icons/ai"
import {GrRefresh} from "react-icons/gr"

export default function EndPage(){
    const [score, setScore] = useState("")
    const [name, setName] = useState("")
    useEffect(()=>{
        if(typeof window !== 'undefined') {
            setScore(sessionStorage.getItem("score"))
            setName(sessionStorage.getItem("nickname"))
        }
    })
    return(
        <main className={styles.main}>
            <div className={styles.score}>
                <p>{score === "" ? "": `${name}`}</p>
                <p>{score === "" ? "": `Your score is ${score}`}</p>
            </div>
            <div className={styles.buttons}>
                <Link href = "/Game" className={styles.button}>
                <span className ={styles.icon}><GrRefresh/></span>Try again
                </Link>
                <Link href = "/Menu" className={styles.button}>
                    <span className ={styles.icon}><AiFillHome/></span>Main Menu
                </Link>
            </div>
        </main>
    )
}