import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Validación simple para los campos requeridos
function validateSubscriptionData(data: unknown) {
  const { name, email } = data as { name?: unknown; email?: unknown };
  
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return 'El nombre debe tener al menos 2 caracteres';
  }
  
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Ingresa un correo electrónico válido';
  }
  
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar los datos recibidos
    const validationError = validateSubscriptionData(body);
    if (validationError) {
      return NextResponse.json(
        { message: validationError },
        { status: 400 }
      );
    }
    
    const { name, email } = body;
    
    // Verificar si el email ya existe
    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: { email: email.toLowerCase().trim() }
    });
    
    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return NextResponse.json(
          { message: 'Este correo ya está suscrito a nuestro boletín' },
          { status: 400 }
        );
      } else {
        // Reactivar suscripción existente
        await prisma.newsletterSubscription.update({
          where: { email: email.toLowerCase().trim() },
          data: {
            name: name.trim(),
            isActive: true,
            updatedAt: new Date()
          }
        });
        
        return NextResponse.json(
          { message: 'Suscripción reactivada exitosamente' },
          { status: 200 }
        );
      }
    }
    
    // Crear nueva suscripción
    await prisma.newsletterSubscription.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim()
      }
    });
    
    return NextResponse.json(
      { message: 'Suscripción exitosa' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error en suscripción al newsletter:', error);
    
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Manejar métodos no permitidos
export async function GET() {
  return NextResponse.json(
    { message: 'Método no permitido' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Método no permitido' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Método no permitido' },
    { status: 405 }
  );
}
