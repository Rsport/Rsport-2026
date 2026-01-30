import { TimeSlot } from '@/lib/data';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import styles from './ScheduleList.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface ScheduleListProps {
    slots: TimeSlot[];
}

export const ScheduleList = ({ slots }: ScheduleListProps) => {
    return (
        <div className={styles.scrollContainer}>
            {slots.map((slot) => (
                <div key={slot.id} className={styles.cardWrapper}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={slot.image}
                            alt={slot.title}
                            fill
                            style={{ objectFit: 'cover', objectPosition: slot.id === 'func-18' ? 'top' : 'center' }}
                        />
                        <span className={styles.badge}>{slot.title === 'Funcional' ? 'Trabajos aeróbicos y de fuerza' : 'Personalizado'}</span>
                    </div>
                    <div className={styles.cardContent}>
                        <h3 className={styles.classTitle}>{slot.title}</h3>
                        <p className={styles.timeInfo}>{slot.time} hs - {slot.days.length} veces/sem</p>
                        <Link href={`/booking?slotId=${slot.id}`} className={styles.link}>
                            <button className={styles.subscribeBtn}>Inscribirse</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};
