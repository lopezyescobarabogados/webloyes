import { NextResponse } from 'next/server'

export async function GET() {
  // Healthcheck simple y rápido para Railway
  return NextResponse.json({ ok: true })
}
