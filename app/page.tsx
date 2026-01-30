import Image from "next/image";
import { SCHEDULE_DATA } from "@/lib/data";
import { ScheduleList } from "@/components/business/ScheduleList";
import styles from "./page.module.css";
import { Button } from "@/components/ui/Button/Button";
import Link from "next/link";

export default function Home() {
  const now = new Date();
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const todayName = dayNames[now.getDay()];

  const todaysClasses = SCHEDULE_DATA.filter(slot => slot.days.includes(todayName));

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Movete bien</h1>
          <p className={styles.heroSubtitle}>
            Tu mejor versión empieza hoy. Entrena, supérate y vive mejor con Rsport.
          </p>
          <Link href="#schedule">
            <button className={styles.ctaButton}>Reservar Turno</button>
          </Link>
        </div>
      </section>

      {/* Classes Section */}
      <section id="schedule" className={styles.classesSection}>
        <div className={styles.sectionHeader}>
          <h2>Clases de hoy ({todayName})</h2>
          <Link href="/info" className={styles.seeAll}>Ver Cronograma →</Link>
        </div>

        {/* Horizontal Scroll Wrapper */}
        <div className={styles.cardsWrapper}>
          {todaysClasses.length > 0 ? (
            <ScheduleList slots={todaysClasses} />
          ) : (
            <p className={styles.emptyMsg}>No hay clases programadas para hoy.</p>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className={styles.infoSection}>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>🛡️</div>
          <h3>¿Por qué elegirnos?</h3>
          <p>Somos más que un gimnasio. Somos una comunidad dedicada a potenciar tu rendimiento con entrenadores expertos.</p>
          <Link href="/info">
            <Button variant="outline" className={styles.infoBtn}>Saber Más →</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
