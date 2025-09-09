import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Healthcheck básico y rápido - solo verificar que el servidor responde
    // No verificamos la DB durante el healthcheck inicial para evitar timeouts
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'lopez-escobar-abogados',
      environment: process.env.NODE_ENV || 'production'
    })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Service unavailable'
    }, { status: 503 })
  }
}
