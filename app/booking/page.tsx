'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SCHEDULE_DATA } from '@/lib/data';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import styles from './booking.module.css';

function BookingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const slotId = searchParams.get('slotId');
    const [isConfirming, setIsConfirming] = useState(false);

    const slot = SCHEDULE_DATA.find(s => s.id === slotId);

    if (!slot) {
        return (
            <div className={styles.container}>
                <Card className={styles.card}>
                    <h1>Clase no encontrada</h1>
                    <Button onClick={() => router.push('/')} variant="outline">Volver</Button>
                </Card>
            </div>
        );
    }

    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const toggleDay = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const handleConfirm = async () => {
        if (selectedDays.length === 0) {
            alert('Por favor selecciona al menos un día.');
            return;
        }

        const storedUser = localStorage.getItem('rsport_user');
        if (!storedUser) {
            alert('Por favor regístrate antes de reservar.');
            // Send to register with return path
            router.push(`/register?redirect=/booking?slotId=${slotId}`);
            return;
        }
        const user = JSON.parse(storedUser);

        setIsConfirming(true);

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: user.name,
                    surname: user.surname,
                    dni: user.dni,
                    email: user.email,
                    className: slot.title,
                    price: slot.price || '$0',
                    time: slot.time,
                    days: selectedDays
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Error en el servidor');
            }

            // Success
            alert(`¡Reserva confirmada para ${slot.title} a las ${slot.time}!\nDías: ${selectedDays.join(', ')}`);
            router.push('/');
        } catch (e: any) {
            console.error(e);
            alert(`Error al reservar: ${e.message}`);
            setIsConfirming(false);
        }
    };

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <h1 className={styles.title}>Confirmar Reserva</h1>

                <div className={styles.details}>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Clase:</span>
                        <span className={styles.value}>{slot.title}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Horario:</span>
                        <span className={styles.value}>{slot.time} hs</span>
                    </div>
                </div>

                <div className={styles.daySelector}>
                    <p className={styles.label}>Seleccioná tus días:</p>
                    <div className={styles.checkboxGrid}>
                        {slot.days.map(day => (
                            <label key={day} className={`${styles.checkboxLabel} ${selectedDays.includes(day) ? styles.activeDay : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={selectedDays.includes(day)}
                                    onChange={() => toggleDay(day)}
                                    className={styles.hiddenCheckbox}
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>

                <div className={styles.actions}>
                    <Button
                        onClick={handleConfirm}
                        fullWidth
                        disabled={isConfirming}
                    >
                        {isConfirming ? 'Confirmando...' : 'Confirmar Reserva'}
                    </Button>
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        fullWidth
                        disabled={isConfirming}
                    >
                        Cancelar
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default function BookingPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <BookingContent />
        </Suspense>
    );
}
