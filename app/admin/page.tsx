'use client';

import { useState, useEffect } from 'react';
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

    useEffect(() => {
        // Fetch bookings from API
        fetch('/api/bookings')
            .then(res => res.json())
            .then(data => setBookings(data));
    }, []);

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Panel de Administrador</h1>
            <Card className={styles.tableCard}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Clase</th>
                                <th>Horario</th>
                                <th>Días</th>
                                <th>Fecha Registro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className={styles.empty}>No hay reservas aún.</td>
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
                                        <td>{booking.time}</td>
                                        <td>
                                            <div className={styles.daysTagWrapper}>
                                                {(booking.days ? booking.days.split(', ') : []).map((d: string) => (
                                                    <span key={d} className={styles.dayTag}>{d.slice(0, 2)}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
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
