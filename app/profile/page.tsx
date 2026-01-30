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
    const [history, setHistory] = useState<any[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('rsport_user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            fetchHistory(userData.dni);
        }
    }, []);

    const fetchHistory = async (dni: string) => {
        setIsLoadingHistory(true);
        try {
            const res = await fetch(`/api/user/history?dni=${dni}`);
            if (res.ok) {
                const data = await res.json();
                setHistory(data);
            }
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setIsLoadingHistory(false);
        }
    };

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

            <h2 className={styles.subtitle}>Mi Agenda / Historial</h2>
            <Card className={styles.historyCard}>
                {isLoadingHistory ? (
                    <p className={styles.emptyMsg}>Cargando tu agenda...</p>
                ) : history.length > 0 ? (
                    <div className={styles.historyList}>
                        {history.map((item) => (
                            <div key={item.id} className={styles.historyItem}>
                                <div className={styles.historyMain}>
                                    <span className={styles.historyClass}>{item.className}</span>
                                    <span className={styles.historyDate}>
                                        {new Date(item.createdAt).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className={styles.historyDetails}>
                                    <span>{item.time}hs</span>
                                    <span>{item.days}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={styles.emptyMsg}>Todavía no tienes clases registradas.</p>
                )}
            </Card>
        </main>
    );
}
