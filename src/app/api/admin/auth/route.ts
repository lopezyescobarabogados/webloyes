import { NextRequest, NextResponse } from 'next/server';
import { adminAuthSchema } from '../../../../utils/validations';

// Rate limiting simple (en producción usar Redis o similar)
const authAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutos

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const attempt = authAttempts.get(ip);
  
  if (!attempt) {
    authAttempts.set(ip, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Si ha pasado el tiempo de lockout, resetear contador
  if (now - attempt.lastAttempt > LOCKOUT_TIME) {
    authAttempts.set(ip, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Si excede intentos máximos
  if (attempt.count >= MAX_ATTEMPTS) {
    return false;
  }
  
  // Incrementar contador
  authAttempts.set(ip, { count: attempt.count + 1, lastAttempt: now });
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    
    // Verificar rate limiting
    if (!checkRateLimit(clientIp)) {
      console.warn('Rate limit exceeded for IP:', clientIp);
      return NextResponse.json(
        {
          success: false,
          message: 'Demasiados intentos fallidos. Intente nuevamente en 15 minutos.',
        },
        { status: 429 }
      );
    }

    // Obtener y validar los datos del request
    const body = await request.json();
    
    // Validar estructura de datos
    const validationResult = adminAuthSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Datos de entrada inválidos',
          errors: validationResult.error.issues,
        },
        { status: 400 }
      );
    }
    
    const { adminKey } = validationResult.data;

    // Obtener la clave del entorno
    const ADMIN_KEY = process.env.ADMIN_KEY;

    // Validar que existe la clave en el entorno
    if (!ADMIN_KEY) {
      console.error(
        'ADMIN_KEY no está configurada en las variables de entorno'
      );
      return NextResponse.json(
        {
          success: false,
          message: 'Configuración del servidor incorrecta',
        },
        { status: 500 }
      );
    }

    // Verificar la clave (comparación segura)
    if (adminKey !== ADMIN_KEY) {
      // Log del intento de acceso fallido con más detalles
      console.warn('Intento de acceso fallido al panel admin:', {
        timestamp: new Date().toISOString(),
        ip: clientIp,
        userAgent: request.headers.get('user-agent') || 'Unknown',
        keyLength: adminKey.length,
        attemptNumber: authAttempts.get(clientIp)?.count || 1,
      });

      return NextResponse.json(
        {
          success: false,
          message: 'Credenciales incorrectas',
        },
        { status: 401 }
      );
    }

    // Acceso exitoso - limpiar intentos fallidos
    authAttempts.delete(clientIp);
    
    // Log del acceso exitoso
    console.info('Acceso exitoso al panel admin:', {
      timestamp: new Date().toISOString(),
      ip: clientIp,
      userAgent: request.headers.get('user-agent') || 'Unknown',
    });

    return NextResponse.json({
      success: true,
      message: 'Autenticación exitosa',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error en autenticación admin:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error interno del servidor',
      },
      { status: 500 }
    );
  }
}
