'use client';
import React from 'react';
import nick from './nick.module.css';
import './globals.css';
import { useRouter } from 'next/navigation';
import { BsCheckCircleFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Nickname() {
	const [input, setInput] = React.useState('');
	const router = useRouter();
	function handleSubmit(e) {
		e.preventDefault();
		const pattern = /^[a-zA-Z]{3,16}$/;
		if (!pattern.test(input)) {
			toast.error('Nicknames can only contain letters.', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});
			return;
		}
		sessionStorage.setItem('nickname', input);
		router.push('/Menu');
	}
	return (
		<div>
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
			<form className={nick.form} onSubmit={handleSubmit}>
				<div className={nick.inputDiv}>
					<p className={nick.p}>Nickname:</p>
					<input
						type="text"
						className={nick.input}
						placeholder="Nickname"
						value={input}
						onChange={(e) => {
							setInput(e.target.value);
						}}
						minLength={3}
						maxLength={16}
						required
					/>
				</div>
				<button className={nick.go} type="submit">
					<span className={nick.icon}>
						<BsCheckCircleFill />
					</span>
					Start
				</button>
			</form>
		</div>
	);
}
