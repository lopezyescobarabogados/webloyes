import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Verificación completa de la base de datos
    const startTime = Date.now()
    
    // Test de conectividad
    await prisma.$queryRaw`SELECT 1`
    
    // Test de tablas principales
    const [newsCount, teamCount, contactCount] = await Promise.all([
      prisma.news.count(),
      prisma.teamMember.count(),
      prisma.contactMessage.count()
    ])
    
    const responseTime = Date.now() - startTime
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        responseTime: `${responseTime}ms`,
        tables: {
          news: newsCount,
          team: teamCount,
          contacts: contactCount
        }
      },
      environment: process.env.NODE_ENV
    })
  } catch (error) {
    console.error('Database health check failed:', error)
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      database: {
        connected: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { status: 503 })
  }
}
