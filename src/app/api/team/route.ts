import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener todos los miembros del equipo
export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: {
        order: 'asc'
      }
    })
    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { error: 'Error al obtener los miembros del equipo' },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo miembro del equipo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received data:', body); // Debug log
    
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

    // Validación básica
    if (!name || !position || !email) {
      return NextResponse.json(
        { error: 'Campos requeridos faltantes: name, position, email' },
        { status: 400 }
      );
    }

    // Validar longitudes
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'El nombre debe tener entre 2 y 100 caracteres' },
        { status: 400 }
      );
    }

    if (position.length < 2 || position.length > 100) {
      return NextResponse.json(
        { error: 'El cargo debe tener entre 2 y 100 caracteres' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El email debe tener un formato válido' },
        { status: 400 }
      );
    }

    // Validar que specialties sea array
    if (!Array.isArray(specialties)) {
      return NextResponse.json(
        { error: 'El campo specialties debe ser un array' },
        { status: 400 }
      );
    }

    const teamMemberData = {
      name,
      position,
      description: description || bio, // Usar description si está disponible, sino bio
      bio: bio || description,
      email,
      phone: phone || null,
      imageUrl: imageUrl || null,
      order: parseInt(order) || 0,
      active: active !== undefined ? Boolean(active) : true,
      specialties: JSON.stringify(specialties),
      education: education || null,
      experience: experience || null
    };

    console.log('Creating team member with data:', teamMemberData); // Debug log

    const teamMember = await prisma.teamMember.create({
      data: teamMemberData
    })

    console.log('Team member created successfully:', teamMember.id); // Debug log
    return NextResponse.json(teamMember, { status: 201 })
  } catch (error) {
    console.error('Error creating team member:', error)
    
    // Más detalles del error
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: 'Error al crear el miembro del equipo',
          details: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Error desconocido al crear el miembro del equipo' },
      { status: 500 }
    )
  }
}
