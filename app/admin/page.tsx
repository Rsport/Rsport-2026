'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card/Card';
import styles from './admin.module.css';
import { Button } from '@/components/ui/Button/Button';

// Types must mirror the store for client-side usage if we were fetching API
// For MVP we'll have to mock the data fetching or use a Server Action if we want true persistence between pages in Next.js
// But for now, since globalStore is on the server/node process, we need a Server Component or Route Handler to access it.
// To keep it simple for this "Client Side" MVP without a DB:
// We will use a simple client-side context or just simulate the admin view with the data we "just added" if we navigate.
// ACTUALLY: globalStore in `lib/store.ts` will work if we use Server Actions or API routes.
// Let's create a simple API route to getting/saving bookings to make this work properly.

export default function AdminPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const router = useRouter();

    const authorizedEmails = ['renngiann@gmail.com', 'rsport19movetebien@gmail.com'];

    useEffect(() => {
        const storedUser = localStorage.getItem('rsport_user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (authorizedEmails.includes(user.email)) {
                setIsAuthorized(true);
                fetchBookings();
            } else {
                router.push('/');
            }
        } else {
            router.push('/');
        }
    }, [selectedDate]);

    const fetchBookings = async () => {
        try {
            const res = await fetch(`/api/bookings?date=${selectedDate}`);
            if (res.ok) {
                const data = await res.json();
                setBookings(data);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    if (!isAuthorized) return null;

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Panel de Administrador</h1>

            <div className={styles.adminControls}>
                <div className={styles.dateFilter}>
                    <label>Ver asistencia para:</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className={styles.dateInput}
                    />
                </div>
                <Button onClick={fetchBookings} variant="outline" className={styles.refreshBtn}>Actualizar</Button>
            </div>

            <Card className={styles.tableCard}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Clase</th>
                                <th>Horario</th>
                                <th>Fecha Clase</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className={styles.empty}>No hay registros de "Presente" para este día.</td>
                                </tr>
                            ) : (
                                bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td>
                                            <div className={styles.userCell}>
                                                <span className={styles.userName}>{booking.user?.name || 'Sin Nombre'} {booking.user?.surname || ''}</span>
                                                <span className={styles.userEmail}>{booking.user?.email || 'Sin Email'}</span>
                                            </div>
                                        </td>
                                        <td>{booking.className}</td>
                                        <td>{booking.time} hs</td>
                                        <td>{booking.date || 'Sin fecha'}</td>
                                        <td>
                                            <span className={styles.statusTag}>Presente</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
            <div className={styles.refresh}>
                <Button onClick={() => window.location.reload()} variant="outline">Actualizar</Button>
            </div>
        </main>
    );
}
