import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener mensaje de contacto por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contactMessage = await prisma.contactMessage.findUnique({
      where: { id }
    })

    if (!contactMessage) {
      return NextResponse.json(
        { error: 'Mensaje de contacto no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(contactMessage)
  } catch (error) {
    console.error('Error fetching contact message:', error)
    return NextResponse.json(
      { error: 'Error al obtener el mensaje de contacto' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar mensaje de contacto (principalmente para cambiar estado)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json()
    const { status, priority } = body

    // Verificar si el mensaje existe
    const existingMessage = await prisma.contactMessage.findUnique({
      where: { id }
    })

    if (!existingMessage) {
      return NextResponse.json(
        { error: 'Mensaje de contacto no encontrado' },
        { status: 404 }
      )
    }

    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data: {
        status,
        priority,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.error('Error updating contact message:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el mensaje de contacto' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar mensaje de contacto
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existingMessage = await prisma.contactMessage.findUnique({
      where: { id }
    })

    if (!existingMessage) {
      return NextResponse.json(
        { error: 'Mensaje de contacto no encontrado' },
        { status: 404 }
      )
    }

    await prisma.contactMessage.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Mensaje de contacto eliminado exitosamente' })
  } catch (error) {
    console.error('Error deleting contact message:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el mensaje de contacto' },
      { status: 500 }
    )
  }
}
