import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Tipos MIME permitidos para seguridad
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png', 
  'image/webp',
  'image/gif',
  'image/svg+xml'
]);

// Validador de ID para prevenir inyección
function isValidId(id: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(id) && id.length <= 30;
}

/**
 * GET /api/images/[id]
 * Sirve imágenes almacenadas como BYTEA en PostgreSQL
 * - Headers optimizados para cache HTTP
 * - Validaciones de seguridad
 * - Manejo robusto de errores
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validación de entrada por seguridad
    if (!isValidId(id)) {
      return new NextResponse('Invalid ID format', { status: 400 });
    }

    // Verificar cache del navegador primero (304 optimization)
    const ifNoneMatch = request.headers.get('if-none-match');
    if (ifNoneMatch === `"img-${id}"`) {
      return new NextResponse(null, { status: 304 });
    }

    // Query optimizada: solo campos necesarios
    const result = await prisma.$queryRaw`
      SELECT "imageData", "imageType"
      FROM "news" 
      WHERE "id" = ${id} AND "imageData" IS NOT NULL
      LIMIT 1
    ` as Array<{
      imageData: Buffer;
      imageType: string;
    }>;

    if (!result?.length) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const { imageData, imageType } = result[0];

    // Validación de seguridad: tipo MIME permitido
    if (!ALLOWED_MIME_TYPES.has(imageType)) {
      console.warn(`[SECURITY] Blocked unsupported MIME type: ${imageType} for ID: ${id}`);
      return new NextResponse('Unsupported image type', { status: 415 });
    }

    // Headers de producción optimizados
    const headers = new Headers({
      'Content-Type': imageType,
      'Content-Length': imageData.length.toString(),
      'Cache-Control': 'public, max-age=31536000, immutable', // 1 año
      'ETag': `"img-${id}"`,
      'X-Content-Type-Options': 'nosniff', // Seguridad
      'Cross-Origin-Resource-Policy': 'cross-origin', // CORS para imágenes
    });

    return new NextResponse(new Uint8Array(imageData), {
      status: 200,
      headers,
    });

  } catch (error) {
    // Log seguro sin exponer información sensible
    console.error('[IMAGE-API] Error:', error instanceof Error ? error.message : 'Unknown error');
    
    // En desarrollo, devolver 404 en lugar de 500 para evitar errores molestos
    if (process.env.NODE_ENV === 'development') {
      return new NextResponse('Image not found in development', { status: 404 });
    }
    
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

/**
 * HEAD /api/images/[id]
 * Metadata de imagen sin transferir datos (bandwidth optimization)
 */
export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!isValidId(id)) {
      return new NextResponse(null, { status: 400 });
    }

    // Query ligero: solo metadata
    const result = await prisma.$queryRaw`
      SELECT "imageType", LENGTH("imageData") as size 
      FROM "news" 
      WHERE "id" = ${id} AND "imageData" IS NOT NULL
      LIMIT 1
    ` as Array<{
      imageType: string;
      size: number;
    }>;

    if (!result?.length) {
      return new NextResponse(null, { status: 404 });
    }

    const { imageType, size } = result[0];

    if (!ALLOWED_MIME_TYPES.has(imageType)) {
      return new NextResponse(null, { status: 415 });
    }

    const headers = new Headers({
      'Content-Type': imageType,
      'Content-Length': size.toString(),
      'Cache-Control': 'public, max-age=31536000, immutable',
      'ETag': `"img-${id}"`,
      'X-Content-Type-Options': 'nosniff',
    });

    return new NextResponse(null, { status: 200, headers });

  } catch (error) {
    console.error('[IMAGE-API HEAD] Error:', error instanceof Error ? error.message : 'Unknown error');
    return new NextResponse(null, { status: 500 });
  }
}
