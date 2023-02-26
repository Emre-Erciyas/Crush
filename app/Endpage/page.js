"use client"
import styles from "./Endpage.module.css"
import { useEffect, useState } from "react"

export default function EndPage(){
    const [score, setScore] = useState("Loading")
    useEffect(()=>{
        if(typeof window !== undefined) setScore(sessionStorage.getItem("score"))
    })
    return(
        <main className={styles.main}>
            {score}
        </main>
    )
}