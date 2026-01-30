import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const dni = searchParams.get('dni');

    if (!dni) {
        return NextResponse.json({ error: 'DNI is required' }, { status: 400 });
    }

    try {
        const history = await db.bookingHistory.findMany({
            where: {
                user: {
                    dni: dni
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(history);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
    }
}
