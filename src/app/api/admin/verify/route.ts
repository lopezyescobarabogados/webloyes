import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Verificar si el usuario está autenticado
    // Por ahora solo retornamos true para desarrollo
    return NextResponse.json({ authenticated: true });
  } catch (error) {
    console.error('Error verifying authentication:', error);
    return NextResponse.json(
      { error: 'Error al verificar autenticación' },
      { status: 500 }
    );
  }
}