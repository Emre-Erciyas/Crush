'use client'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './settings.module.css'
import '../globals.css'
import Link from 'next/link';
export default function Settings() {
    const [input, setInput] = React.useState('');
    function handleSubmit(e){
        e.preventDefault()
        const pattern = /^[a-zA-Z]{3,16}$/
        if(!pattern.test(input)){
            toast.error('Nicknames can only contain letters.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return
        }
        sessionStorage.setItem('nickname', input)
        toast.success('Successful', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
    return (
        <div className = {styles.container}>
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
            />
            <form className = {styles.form} onSubmit={handleSubmit}>
                <div className = {styles.inputDiv}>
                    <p className={styles.p}>Nickname:</p>
                    <input 
                        type="text"  
                        className={styles.input}
                        placeholder = 'Nickname'
                        value={input}
                        onChange = {(e) => {setInput(e.target.value)}}
                        minLength = {3}
                        maxLength= {16}
                        required
                        />
                        <button className={styles.button}>Change</button>
                </div>
            </form>
            <Link href='/Menu' className={styles.goback}>Go back</Link>
        </div>
    )
}
