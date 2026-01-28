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
                <div className={styles.avatar}>
                    <span>{user.name[0]}{user.surname[0]}</span>
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
