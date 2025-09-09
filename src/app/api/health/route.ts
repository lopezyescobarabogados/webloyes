import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Healthcheck simple para Railway
    return NextResponse.json({ 
      ok: true,
      status: 'healthy',
      port: process.env.PORT || 3000,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      { ok: false, status: 'error' },
      { status: 503 }
    )
  }
}
