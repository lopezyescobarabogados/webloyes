import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Esquema de validación para el admin panel
const adminContactSchema = {
  name: (value: string) => value?.length >= 2,
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message: (value: string) => value?.length >= 20
}

// GET - Obtener todos los mensajes de contacto
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    const where = status ? { status } : {}
    const take = limit ? parseInt(limit) : undefined
    const skip = offset ? parseInt(offset) : undefined

    const messages = await prisma.contactMessage.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: 'desc' }
    })

    const total = await prisma.contactMessage.count({ where })

    return NextResponse.json({
      messages,
      total,
      hasMore: take && skip !== undefined ? skip + take < total : false
    })
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    return NextResponse.json(
      { error: 'Error al obtener los mensajes de contacto' },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo mensaje de contacto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Manejar tanto el formato antiguo (formulario público) como el nuevo (admin)
    let contactData
    
    if (body.nombre && body.apellido) {
      // Formato del formulario público
      contactData = {
        name: `${body.nombre} ${body.apellido}`,
        email: body.correo,
        phone: body.telefono,
        subject: body.asunto,
        message: body.mensaje,
        priority: 'MEDIUM',
        source: 'WEB_FORM',
        status: 'PENDING'
      }
    } else {
      // Formato del admin panel
      const { name, email, phone, subject, message, priority, source } = body
      
      // Validaciones básicas
      if (!adminContactSchema.name(name) || !adminContactSchema.email(email) || !adminContactSchema.message(message)) {
        return NextResponse.json(
          { error: 'Nombre, email y mensaje son requeridos y deben cumplir los requisitos mínimos' },
          { status: 400 }
        )
      }
      
      contactData = {
        name,
        email,
        phone,
        subject: subject || 'Consulta general',
        message,
        priority: priority || 'MEDIUM',
        source: source || 'WEB_FORM',
        status: 'PENDING'
      }
    }

    const contactMessage = await prisma.contactMessage.create({
      data: contactData
    })

    return NextResponse.json(contactMessage, { status: 201 })
  } catch (error) {
    console.error('Error creating contact message:', error)
    return NextResponse.json(
      { error: 'Error al crear el mensaje de contacto' },
      { status: 500 }
    )
  }
}

// Método OPTIONS para CORS (si es necesario)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
