export type ClassType = 'Funcional' | 'Semipersonalizado';

export interface TimeSlot {
    id: string;
    title: ClassType;
    time: string;
    days: string[]; // 'Lunes', 'Martes', etc.
    capacity: number;
    image: string;
    price?: string;
}

export const SCHEDULE_DATA: TimeSlot[] = [
    {
        id: 'func-18',
        title: 'Funcional',
        time: '18:00',
        days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        capacity: 15,
        image: '/assets/funcional.png',
        price: '$29.000'
    },
    {
        id: 'func-19',
        title: 'Funcional',
        time: '19:00',
        days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        capacity: 15,
        image: '/assets/funcional.png',
        price: '$29.000'
    },
    {
        id: 'semip-20',
        title: 'Semipersonalizado',
        time: '20:00',
        days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        capacity: 8,
        image: '/assets/semipersonalizado.png',
        price: '$40.000'
    }
];
