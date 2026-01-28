'use client';

import Link from 'next/link';
import styles from './Drawer.module.css';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Drawer = ({ isOpen, onClose }: DrawerProps) => {
    return (
        <>
            {/* Backdrop */}
            {isOpen && <div className={styles.backdrop} onClick={onClose} />}

            {/* Drawer */}
            <nav className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <span className={styles.title}>Menú</span>
                </div>

                <ul className={styles.links}>
                    <li>
                        <Link href="/" onClick={onClose}>
                            <span className={styles.icon}>🏠</span> Inicio
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile" onClick={onClose}>
                            <span className={styles.icon}>👤</span> Mi Perfil
                        </Link>
                    </li>
                    <li>
                        <Link href="/info" onClick={onClose}>
                            <span className={styles.icon}>ℹ️</span> Información
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin" onClick={onClose}>
                            <span className={styles.icon}>⚙️</span> Admin
                        </Link>
                    </li>
                </ul>

                <div className={styles.footer}>
                    <p>© 2026 Rsport</p>
                    <p className={styles.motto}>Movete bien</p>
                </div>
            </nav>
        </>
    );
};
