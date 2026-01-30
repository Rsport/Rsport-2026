import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');
    const time = searchParams.get('time');
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

    if (!className || !time) {
        return NextResponse.json({ error: 'Class name and time are required' }, { status: 400 });
    }

    try {
        const bookings = await db.booking.findMany({
            where: {
                className,
                time,
                date
            },
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });

        const names = bookings.map(b => b.user.name);
        return NextResponse.json(names);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch attendees' }, { status: 500 });
    }
}
