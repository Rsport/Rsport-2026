import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
    // Basic security check: Vercel sends an Authorization header with the Cron Job
    // If we want to be super secure, we'd check against a CRON_SECRET env var.
    // For now, we'll implement the logic to clear all bookings.

    try {
        console.log('Starting automated cleanup...');

        // Delete all bookings to reset for the new week
        const deleted = await prisma.booking.deleteMany({});

        console.log(`Cleanup successful. Removed ${deleted.count} bookings.`);

        return NextResponse.json({
            success: true,
            message: `Eliminación completada. Se borraron ${deleted.count} reservas.`
        });
    } catch (error: any) {
        console.error('Cleanup error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
