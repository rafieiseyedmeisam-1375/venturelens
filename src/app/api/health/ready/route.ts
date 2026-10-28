import { NextResponse } from 'next/server';
import { isDatabaseReady } from '@/services/health.service';
export const dynamic = 'force-dynamic';
export async function GET() {
  const ready = await isDatabaseReady();
  return NextResponse.json(
    { status: ready ? 'ready' : 'unavailable' },
    {
      status: ready ? 200 : 503,
      headers: { 'Cache-Control': 'no-store' },
    },
  );
}
