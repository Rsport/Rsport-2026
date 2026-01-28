'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import styles from './register.module.css';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        dni: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Save user locally for MVP persistence across pages
        localStorage.setItem('rsport_user', JSON.stringify(formData));

        // Redirect back to booking if we came from there
        const searchParams = new URLSearchParams(window.location.search);
        const redirectTo = searchParams.get('redirect');

        if (redirectTo) {
            router.push(redirectTo);
        } else {
            router.push('/');
        }
    };

    return (
        <main className={styles.container}>
            <Card className={styles.formCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>¡Bienvenido a Rsport!</h1>
                    <p className={styles.subtitle}>Completá tus datos para empezar a entrenar.</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.row}>
                        <Input
                            name="name"
                            label="Nombre"
                            placeholder="Juan"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="surname"
                            label="Apellido"
                            placeholder="Pérez"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Input
                        name="dni"
                        label="DNI"
                        placeholder="12345678"
                        type="number"
                        value={formData.dni}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        name="email"
                        label="Email"
                        placeholder="juan@ejemplo.com"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <Button type="submit" fullWidth className={styles.submitButton}>
                        Registrarme
                    </Button>
                </form>
            </Card>
        </main>
    );
}
