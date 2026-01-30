import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    try {
        const bookings = await db.booking.findMany({
            where: date ? { date } : {},
            include: { user: true },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, surname, dni, email, className, price, time, days, date } = body;

        // Upsert user based on DNI
        const user = await db.user.upsert({
            where: { dni: dni },
            update: { name, surname, email },
            create: { name, surname, dni, email },
        });

        // Create booking (for the daily/weekly schedule)
        const newBooking = await db.booking.create({
            data: {
                className,
                price: price || '$0',
                time,
                days: Array.isArray(days) ? days.join(', ') : (days as string),
                date: date || new Date().toISOString().split('T')[0],
                userId: user.id
            }
        });

        // Create booking history (persistent)
        await db.bookingHistory.create({
            data: {
                className,
                price: price || '$0',
                time,
                days: Array.isArray(days) ? days.join(', ') : (days as string),
                date: date || new Date().toISOString().split('T')[0],
                userId: user.id
            }
        });

        return NextResponse.json(newBooking);
    } catch (error: any) {
        console.error('Booking error:', error);
        return NextResponse.json({
            error: 'Failed to create booking',
            details: error.message
        }, { status: 500 });
    }
}
