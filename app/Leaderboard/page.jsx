'use client'
import React from 'react'
import { db } from '@/firebase';
import {doc, setDoc,getDoc} from "firebase/firestore"; 
import styles from './leaderboard.module.css'
import '../globals.css'
import Link from 'next/link';
import Loading from '@/loading';
export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() =>{
        let arr = []
        async function getLeaderboard(){
            try{
                const docRef = doc(db, "Leaderboard", "First10");
                const docSnap = await getDoc(docRef);
                
                arr = docSnap.data().leaderboard;
                (arr && arr.length > 0  && arr.sort((a,b) => a.score - b.score).reverse())
                setLeaderboard(arr)
                setLoading(false)
            }
            catch(e){
                console.log("Error getting document: ", e);
            }
        }

        getLeaderboard()
        
    }, [])
    if(loading) return <Loading />
    return (
        <div className={styles.container}>
            <h1 className={styles.leaderboard}>Leaderboard</h1>
            {leaderboard.length > 0 && leaderboard.map((element, index)=>{
                return (<div key={element.id} className={styles.element}>
                    <h3 className={styles.h3}>{index + 1}. {element.name}</h3>
                    <p className={styles.p}>{element.score}</p>
                </div>)
            })}
            <Link href={'/Menu'} className = {styles.link}>Main Menu</Link>
        </div>
    )
}
