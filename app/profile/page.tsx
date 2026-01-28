'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './profile.module.css';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';

interface UserData {
    name: string;
    surname: string;
    dni: string;
    email: string;
    image?: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<UserData | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('rsport_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // If not logged in, send to home? or keep empty
        }
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            const updatedUser = { ...user, image: base64String };
            setUser(updatedUser);
            localStorage.setItem('rsport_user', JSON.stringify(updatedUser));
            window.dispatchEvent(new Event('storage'));
        };
        reader.readAsDataURL(file);
    };

    const handleLogout = () => {
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            localStorage.removeItem('rsport_user');
            router.push('/');
        }
    };

    if (!user) {
        return (
            <main className={styles.container}>
                <Card className={styles.profileCard}>
                    <h2>No has iniciado sesión</h2>
                    <p>Regístrate o inicia sesión haciendo tu primera reserva.</p>
                    <Button onClick={() => router.push('/')} style={{ marginTop: '1rem' }}>
                        Ir al Inicio
                    </Button>
                </Card>
            </main>
        );
    }

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Mi Perfil</h1>

            <Card className={styles.profileCard}>
                <div className={styles.avatarWrapper}>
                    <label htmlFor="imageUpload" className={styles.avatarLabel}>
                        <div className={styles.avatar}>
                            {user.image ? (
                                <img src={user.image} alt="Profile" className={styles.avatarImg} />
                            ) : (
                                <span>{user.name[0]}{user.surname[0]}</span>
                            )}
                            <div className={styles.avatarOverlay}>
                                👤
                            </div>
                        </div>
                    </label>
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.hiddenInput}
                    />
                </div>

                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <label>Nombre</label>
                        <p>{user.name}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <label>Apellido</label>
                        <p>{user.surname}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <label>DNI</label>
                        <p>{user.dni}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <label>Email</label>
                        <p>{user.email}</p>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Button variant="outline" onClick={handleLogout} className={styles.logoutBtn}>
                        Cerrar Sesión
                    </Button>
                </div>
            </Card>
        </main>
    );
}
