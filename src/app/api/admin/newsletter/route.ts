import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Obtener suscripciones con paginación
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Obtener suscripciones con paginación
    const [subscriptions, total] = await Promise.all([
      prisma.newsletterSubscription.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
      }),
      prisma.newsletterSubscription.count()
    ]);

    // Calcular información de paginación
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      subscriptions,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount: total,
        hasNextPage,
        hasPrevPage,
        limit
      },
      total
    });
  } catch (error) {
    console.error('Error getting newsletter subscriptions:', error);
    return NextResponse.json(
      { error: 'Error al obtener las suscripciones' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar estado de suscripción
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, isActive } = body;

    if (!id || typeof isActive !== 'boolean') {
      return NextResponse.json(
        { error: 'ID y estado (isActive) son requeridos' },
        { status: 400 }
      );
    }

    // Verificar que la suscripción existe
    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: { id }
    });

    if (!existingSubscription) {
      return NextResponse.json(
        { error: 'Suscripción no encontrada' },
        { status: 404 }
      );
    }

    // Actualizar el estado de la suscripción
    const updatedSubscription = await prisma.newsletterSubscription.update({
      where: { id },
      data: {
        isActive,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      message: `Suscripción ${isActive ? 'activada' : 'desactivada'} exitosamente`,
      subscription: updatedSubscription
    });
  } catch (error) {
    console.error('Error updating newsletter subscription:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la suscripción' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar suscripción (soft delete)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID de suscripción requerido' },
        { status: 400 }
      );
    }

    // Verificar que la suscripción existe
    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: { id }
    });

    if (!existingSubscription) {
      return NextResponse.json(
        { error: 'Suscripción no encontrada' },
        { status: 404 }
      );
    }

    // Soft delete - marcar como inactiva en lugar de eliminar
    await prisma.newsletterSubscription.update({
      where: { id },
      data: {
        isActive: false,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      message: 'Suscripción desactivada exitosamente'
    });
  } catch (error) {
    console.error('Error deleting newsletter subscription:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la suscripción' },
      { status: 500 }
    );
  }
}
