import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener miembro del equipo por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const teamMember = await prisma.teamMember.findUnique({
      where: { id }
    })

    if (!teamMember) {
      return NextResponse.json(
        { error: 'Miembro del equipo no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(teamMember)
  } catch (error) {
    console.error('Error fetching team member:', error)
    return NextResponse.json(
      { error: 'Error al obtener el miembro del equipo' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar miembro del equipo
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json()
    const { 
      name, 
      position, 
      description, 
      bio, 
      email, 
      phone, 
      imageUrl, 
      order, 
      active, 
      specialties, 
      education, 
      experience 
    } = body

    // Verificar si el miembro existe
    const existingMember = await prisma.teamMember.findUnique({
      where: { id }
    })

    if (!existingMember) {
      return NextResponse.json(
        { error: 'Miembro del equipo no encontrado' },
        { status: 404 }
      )
    }

    const updatedMember = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        position,
        description,
        bio,
        email,
        phone,
        imageUrl,
        order: order || 0,
        active: active !== undefined ? active : true,
        specialties: JSON.stringify(specialties || []),
        education,
        experience
      }
    })

    return NextResponse.json(updatedMember)
  } catch (error) {
    console.error('Error updating team member:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el miembro del equipo' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar miembro del equipo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existingMember = await prisma.teamMember.findUnique({
      where: { id }
    })

    if (!existingMember) {
      return NextResponse.json(
        { error: 'Miembro del equipo no encontrado' },
        { status: 404 }
      )
    }

    await prisma.teamMember.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Miembro del equipo eliminado exitosamente' })
  } catch (error) {
    console.error('Error deleting team member:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el miembro del equipo' },
      { status: 500 }
    )
  }
}
