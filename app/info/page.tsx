'use client';

import { Card } from '@/components/ui/Card/Card';
import styles from './info.module.css';

export default function InfoPage() {
    return (
        <main className={styles.container}>
            {/* Philosophy Section */}
            <section className={styles.section}>
                <div className={styles.philosophyHeader}>
                    <h1 className={styles.mainTitle}>Espacio de movimiento</h1>
                    <p className={styles.philosophyText}>
                        Somos un gimnasio lleno de actividades que te invita a moverte bien.
                        Nos enfocamos en el cuidado de tu cuerpo y lo que haces con él.
                        Queremos que encuentres en esa decisión de entrenar, un sentido para mantenerte sano y feliz.
                    </p>
                    <div className={styles.location}>
                        📍 Gimnasio 15 n1270 e/ 58 y 59
                    </div>
                </div>
            </section>

            {/* Activities Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Nuestras Actividades</h2>
                <div className={styles.grid}>
                    <Card className={`${styles.activityCard} ${styles.bgFuncional}`}>
                        <div className={styles.cardOverlay}></div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.activityTitle}>Funcional</h3>
                            <p>Un entrenamiento que busca mejorar las capacidades físicas necesarias para poder realizar movimientos de forma eficiente, segura y con menor riesgo de lesiones.</p>
                            <p>Trabaja con la combinación de cadenas musculares, incorporando ejercicios de movilidad, fuerza, aeróbicos, de estabilidad, coordinación y cognitivos.</p>
                        </div>
                    </Card>

                    <Card className={`${styles.activityCard} ${styles.bgSemi}`}>
                        <div className={styles.cardOverlay}></div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.activityTitle}>Semipersonalizado</h3>
                            <p>Combina una atención individual de un entrenamiento personalizado con la dinámica de un entrenamiento colectivo.</p>
                            <p>El profesional desarrolla un plan de 4 semanas adaptado a tus objetivos y capacidades. Es una planificación individual dentro de un grupo.</p>
                        </div>
                    </Card>

                    <Card className={`${styles.activityCard} ${styles.bgTaekwondo}`}>
                        <div className={styles.cardOverlay}></div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.activityTitle}>Taekwondo</h3>
                            <p>Arte marcial coreano que combina técnicas de defensa personal, combate y disciplina mental.</p>
                            <p>Se caracteriza por el uso de patadas altas, rápidas y potentes. Promueve valores como el respeto, la perseverancia, la cortesía, el autocontrol y el espíritu indomable.</p>
                        </div>
                    </Card>

                    <Card className={`${styles.activityCard} ${styles.bgYoga}`}>
                        <div className={styles.cardOverlay}></div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.activityTitle}>Yoga Integral-dinámica</h3>
                            <p>Busca trabajar al ser humano de manera completa: cuerpo, mente, emociones y espíritu.</p>
                            <p>Fortalece y flexibiliza el cuerpo, reduce el estrés y promueve un estilo de vida más consciente y saludable. No es solo ejercicio físico, sino una práctica integral.</p>
                        </div>
                    </Card>

                    <Card className={`${styles.activityCard} ${styles.bgRitmos}`}>
                        <div className={styles.cardOverlay}></div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.activityTitle}>Ritmos Latinos</h3>
                            <p>Disciplina grupal que combina música y danza de géneros latinoamericanos (salsa, reguetón, cumbia, merengue, samba, bachata).</p>
                            <p>Mejoramos nuestra coordinación, equilibrio, resistencia cardiovascular y la expresión corporal, disfrutando del movimiento de manera divertida.</p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Schedule Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Días y Horarios</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.scheduleTable}>
                        <thead>
                            <tr>
                                <th>Horario</th>
                                <th>Lunes</th>
                                <th>Martes</th>
                                <th>Miércoles</th>
                                <th>Jueves</th>
                                <th>Viernes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={styles.timeCell}>18:00hs</td>
                                <td><span className={styles.tagFuncional}>Funcional</span><br /><span className={styles.tagRitmos}>Ritmos Latinos</span></td>
                                <td><span className={styles.tagFuncional}>Funcional</span><br /><span className={styles.tagTaekwondo}>Taekwondo</span></td>
                                <td><span className={styles.tagFuncional}>Funcional</span><br /><span className={styles.tagRitmos}>Ritmos Latinos</span></td>
                                <td><span className={styles.tagFuncional}>Funcional</span><br /><span className={styles.tagTaekwondo}>Taekwondo</span></td>
                                <td><span className={styles.tagFuncional}>Funcional</span></td>
                            </tr>
                            <tr>
                                <td className={styles.timeCell}>19:00hs</td>
                                <td><span className={styles.tagFuncional}>Funcional</span><br /><span className={styles.tagYoga}>Yoga</span></td>
                                <td><span className={styles.tagFuncional}>Funcional</span><br /><span className={styles.tagTaekwondo}>Taekwondo</span></td>
                                <td><span className={styles.tagFuncional}>Funcional</span><br /><span className={styles.tagYoga}>Yoga</span></td>
                                <td><span className={styles.tagFuncional}>Funcional</span><br /><span className={styles.tagTaekwondo}>Taekwondo</span></td>
                                <td><span className={styles.tagFuncional}>Funcional</span></td>
                            </tr>
                            <tr>
                                <td className={styles.timeCell}>20:00hs</td>
                                <td><span className={styles.tagSemi}>Semipersonalizado</span></td>
                                <td><span className={styles.tagSemi}>Semipersonalizado</span></td>
                                <td><span className={styles.tagSemi}>Semipersonalizado</span></td>
                                <td><span className={styles.tagSemi}>Semipersonalizado</span></td>
                                <td><span className={styles.tagSemi}>Semipersonalizado</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Prices Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Precios</h2>
                <div className={styles.pricesGrid}>
                    {/* General Price Card */}
                    {/* Funcional Price Card */}
                    <Card className={styles.priceCard}>
                        <h3 className={styles.priceTitle}>Funcional</h3>
                        <table className={styles.priceTable}>
                            <thead><tr><th>Cantidad</th><th>Mes</th><th>Quincena</th></tr></thead>
                            <tbody>
                                <tr><td>1 Clase Aislada</td><td>$21.000</td><td>-</td></tr>
                                <tr><td>1 Vez x Sem</td><td>$29.000</td><td>$22.000</td></tr>
                                <tr><td>2 Veces x Sem</td><td>$36.000</td><td>$27.000</td></tr>
                                <tr><td>3 Veces x Sem</td><td>$38.000</td><td>$29.000</td></tr>
                                <tr><td>4 Veces x Sem</td><td>$43.000</td><td>$33.000</td></tr>
                                <tr><td>5 Veces x Sem</td><td>$46.000</td><td>$35.000</td></tr>
                            </tbody>
                        </table>
                    </Card>

                    {/* Ritmos - Taekwondo Price Card */}
                    <Card className={styles.priceCard}>
                        <h3 className={styles.priceTitle}>Ritmos Latinos - Taekwondo</h3>
                        <table className={styles.priceTable}>
                            <thead><tr><th>Cantidad</th><th>Mes</th><th>Quincena</th></tr></thead>
                            <tbody>
                                <tr><td>1 Clase Aislada</td><td>$21.000</td><td>-</td></tr>
                                <tr><td>1 Vez x Sem</td><td>$29.000</td><td>$22.000</td></tr>
                                <tr><td>2 Veces x Sem</td><td>$36.000</td><td>$27.000</td></tr>
                            </tbody>
                        </table>
                    </Card>

                    {/* Semi Price Card */}
                    <Card className={styles.priceCard}>
                        <h3 className={styles.priceTitle}>Semipersonalizado</h3>
                        <table className={styles.priceTable}>
                            <thead><tr><th>Cantidad</th><th>Mes</th><th>Quincena</th></tr></thead>
                            <tbody>
                                <tr><td>1 Clase Aislada</td><td>$27.000</td><td>-</td></tr>
                                <tr><td>1 Vez x Sem</td><td>$40.000</td><td>$30.000</td></tr>
                                <tr><td>2 Veces x Sem</td><td>$46.000</td><td>$35.000</td></tr>
                                <tr><td>3 Veces x Sem</td><td>$50.000</td><td>$38.000</td></tr>
                                <tr><td>4 Veces x Sem</td><td>$53.000</td><td>$40.000</td></tr>
                                <tr><td>5 Veces x Sem</td><td>$57.000</td><td>$43.000</td></tr>
                            </tbody>
                        </table>
                    </Card>

                    {/* Yoga Price Card */}
                    <Card className={styles.priceCard}>
                        <h3 className={styles.priceTitle}>Yoga</h3>
                        <table className={styles.priceTable}>
                            <thead><tr><th>Cantidad</th><th>Mes</th><th>Quincena</th></tr></thead>
                            <tbody>
                                <tr><td>1 Clase Aislada</td><td>$35.000</td><td>-</td></tr>
                                <tr><td>1 Vez x Sem</td><td>$40.000</td><td>$30.000</td></tr>
                                <tr><td>2 Veces x Sem</td><td>$50.000</td><td>$38.000</td></tr>
                            </tbody>
                        </table>
                    </Card>
                </div>
            </section>

            <section className={styles.promoSection}>
                <Card className={styles.promoCard}>
                    <h2>VENÍ A PROBAR UNA CLASE</h2>
                    <div className={styles.freeBadge}>¡GRATIS!</div>
                </Card>
            </section>
        </main>
    );
}
