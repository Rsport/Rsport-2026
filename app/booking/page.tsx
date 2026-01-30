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
    const [attendees, setAttendees] = useState<string[]>([]);
    const [showAttendees, setShowAttendees] = useState(false);
    const [isLoadingAttendees, setIsLoadingAttendees] = useState(false);

    const slot = SCHEDULE_DATA.find(s => s.id === slotId);

    const fetchAttendees = async () => {
        if (!slot) return;
        setIsLoadingAttendees(true);
        try {
            const res = await fetch(`/api/bookings/attendees?className=${slot.title}&time=${slot.time}`);
            if (res.ok) {
                const data = await res.json();
                setAttendees(data);
            }
        } catch (error) {
            console.error('Error fetching attendees:', error);
        } finally {
            setIsLoadingAttendees(false);
        }
    };

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

    const [selectedDate, setSelectedDate] = useState<string>('');

    // Generate options for "Presente"
    const getPresenteOptions = () => {
        const options = [];
        const now = new Date();

        // Helper to format date for display
        const formatDate = (date: Date) => {
            const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            const dayName = dayNames[date.getDay()];
            const dayNum = date.getDate();
            const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
            const month = monthNames[date.getMonth()];
            return `${dayName} ${dayNum} de ${month}`;
        };

        // Helper to format date for value (YYYY-MM-DD)
        const formatValue = (date: Date) => {
            const d = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
            return d.toISOString().split('T')[0];
        };

        // Today only
        if (slot.days.includes(['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][now.getDay()])) {
            const todayVal = formatValue(now);
            options.push({
                label: `Hoy (${formatDate(now)})`,
                value: todayVal
            });
            // Auto-select today
            if (!selectedDate) setSelectedDate(todayVal);
        }

        return options;
    };

    const dateOptions = getPresenteOptions();

    const handleConfirm = async () => {
        if (!selectedDate) {
            alert('Por favor selecciona el día para dar el presente.');
            return;
        }

        const storedUser = localStorage.getItem('rsport_user');
        if (!storedUser) {
            alert('Por favor regístrate antes de reservar.');
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
                    days: ['Puntual'], // Marking as a specific day instead of a weekly set
                    date: selectedDate
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Error en el servidor');
            }

            alert(`¡Asistencia confirmada para ${slot.title} el día ${selectedDate}!`);
            router.push('/');
        } catch (e: any) {
            console.error(e);
            alert(`Error al dar el presente: ${e.message}`);
            setIsConfirming(false);
        }
    };

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <h1 className={styles.title}>Dar el Presente</h1>

                <div className={styles.details}>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Clase:</span>
                        <span className={styles.value}>{slot.title}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Horario:</span>
                        <span className={styles.value}>{slot.time} hs</span>
                    </div>

                    <button
                        className={styles.attendeesBtn}
                        onClick={(e) => {
                            e.preventDefault();
                            setShowAttendees(!showAttendees);
                            if (!showAttendees) fetchAttendees();
                        }}
                    >
                        👥 Ver quiénes vienen hoy
                    </button>
                    {showAttendees && (
                        <div className={styles.attendeesList}>
                            {isLoadingAttendees ? (
                                <p className={styles.attendeeMsg}>Cargando...</p>
                            ) : attendees.length > 0 ? (
                                attendees.map((name, i) => (
                                    <span key={i} className={styles.attendeeName}>{name}</span>
                                ))
                            ) : (
                                <p className={styles.attendeeMsg}>Nadie anotado aún para este turno.</p>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.daySelector}>
                    <p className={styles.label}>Seleccioná el día:</p>
                    <div className={styles.checkboxGrid}>
                        {dateOptions.map(opt => (
                            <label key={opt.value} className={`${styles.checkboxLabel} ${selectedDate === opt.value ? styles.activeDay : ''}`}>
                                <input
                                    type="radio"
                                    name="attendanceDate"
                                    checked={selectedDate === opt.value}
                                    onChange={() => setSelectedDate(opt.value)}
                                    className={styles.hiddenCheckbox}
                                />
                                {opt.label}
                            </label>
                        ))}
                    </div>
                    {dateOptions.length === 0 && (
                        <p className={styles.errorMsg}>Esta clase no está disponible para hoy ni mañana.</p>
                    )}
                </div>

                <div className={styles.actions}>
                    <Button
                        onClick={handleConfirm}
                        fullWidth
                        disabled={isConfirming || dateOptions.length === 0}
                    >
                        {isConfirming ? 'Confirmando...' : 'Dar el Presente'}
                    </Button>
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        fullWidth
                        disabled={isConfirming}
                    >
                        Volver
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
