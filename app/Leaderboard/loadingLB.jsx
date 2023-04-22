import Image from 'next/image';
import React from 'react';
import styles from '@/loading.module.css';
import loading from '@/public/loading.svg';
import '@/app/globals.css';
export default function Loading() {
	return (
		<div className={styles.loading}>
			<Image src={loading} alt="Loading..." />
		</div>
	);
}
