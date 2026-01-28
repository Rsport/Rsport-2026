'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

export const Header = () => {
    return (
        <header className={styles.header}>
            <button className={styles.menuBtn}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <div className={styles.brand}>
                <Link href="/">
                    <Image
                        src="/assets/uploaded_media_2_1769544962417.png"
                        alt="Rsport Logo"
                        width={120}
                        height={40}
                        className={styles.logoImage}
                        style={{ objectFit: 'contain' }}
                    />
                </Link>
            </div>
            <div className={styles.profile}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
        </header>
    );
};
