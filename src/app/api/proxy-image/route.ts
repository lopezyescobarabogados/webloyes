import { NextRequest, NextResponse } from 'next/server';
import { validateImageUrl } from '@/utils/image-validation';

/**
 * API Route para proxy de imágenes externas
 * Soluciona problemas de CORS con URLs externas de imágenes
 * 
 * @method POST
 * @body { imageUrl: string }
 * @returns { success: boolean, dataUrl?: string, originalUrl?: string, size?: number, error?: string }
 */
export async function POST(request: NextRequest) {
  try {
    // Validar Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Content-Type debe ser application/json' 
        },
        { status: 400 }
      );
    }

    // Parsear body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { 
          success: false, 
          error: 'JSON inválido en el body de la petición' 
        },
        { status: 400 }
      );
    }

    const { imageUrl } = body;

    // Validar que imageUrl esté presente y sea string
    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'URL de imagen requerida como string válido' 
        },
        { status: 400 }
      );
    }

    // Validación estricta usando validateImageUrl
    const validation = validateImageUrl(imageUrl);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: validation.error || 'URL de imagen inválida' 
        },
        { status: 400 }
      );
    }

    // Rechazar data URLs (no necesitan proxy)
    if (imageUrl.startsWith('data:')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Las data URLs no requieren proxy' 
        },
        { status: 400 }
      );
    }

    // Validar que sea una URL válida
    let urlObj;
    try {
      urlObj = new URL(imageUrl);
    } catch {
      return NextResponse.json(
        { 
          success: false, 
          error: 'URL de imagen inválida' 
        },
        { status: 400 }
      );
    }

    // Validar protocolo (solo HTTPS para URLs externas)
    if (urlObj.protocol !== 'https:' && !urlObj.hostname.includes('localhost')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Solo se permiten URLs HTTPS' 
        },
        { status: 400 }
      );
    }

    // Lista de dominios bloqueados por seguridad
    const blockedDomains = [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      '[::]',
      // Agregar otros dominios problemáticos aquí
    ];

    if (blockedDomains.some(domain => urlObj.hostname.includes(domain)) && 
        !urlObj.hostname.includes('localhost')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Dominio no permitido' 
        },
        { status: 403 }
      );
    }

    // Configurar headers para el fetch
    const fetchHeaders = {
      'User-Agent': 'Mozilla/5.0 (compatible; López&Escobar-Bot/1.0)',
      'Accept': 'image/*,*/*;q=0.8',
      'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    };

    // Realizar fetch con timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout

    let response;
    try {
      response = await fetch(imageUrl, {
        method: 'GET',
        headers: fetchHeaders,
        signal: controller.signal,
        // Seguir redirects automáticamente
        redirect: 'follow',
      });
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Timeout: La imagen tardó demasiado en responder' 
          },
          { status: 408 }
        );
      }
      
      const errorMessage = fetchError instanceof Error ? fetchError.message : 'Error desconocido';
      return NextResponse.json(
        { 
          success: false, 
          error: `Error al obtener la imagen: ${errorMessage}` 
        },
        { status: 502 }
      );
    } finally {
      clearTimeout(timeoutId);
    }

    // Verificar que la respuesta sea exitosa
    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Error HTTP ${response.status}: ${response.statusText}` 
        },
        { status: response.status >= 500 ? 502 : response.status }
      );
    }

    // Verificar Content-Type de la respuesta
    const responseContentType = response.headers.get('content-type') || '';
    if (!responseContentType.startsWith('image/')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'La URL no apunta a una imagen válida' 
        },
        { status: 400 }
      );
    }

    // Verificar tamaño de la imagen (máximo 10MB)
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'La imagen es demasiado grande (máximo 10MB)' 
        },
        { status: 413 }
      );
    }

    // Convertir respuesta a ArrayBuffer
    let arrayBuffer;
    try {
      arrayBuffer = await response.arrayBuffer();
    } catch {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Error al procesar los datos de la imagen' 
        },
        { status: 500 }
      );
    }

    // Verificar tamaño real del buffer
    if (arrayBuffer.byteLength > 10 * 1024 * 1024) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'La imagen descargada es demasiado grande (máximo 10MB)' 
        },
        { status: 413 }
      );
    }

    // Convertir a Buffer y luego a base64
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    
    // Crear data URL
    const dataUrl = `data:${responseContentType};base64,${base64}`;

    // Log para monitoreo (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[PROXY-IMAGE] Procesada: ${imageUrl} -> ${Math.round(buffer.length / 1024)}KB`);
    }

    // Retornar respuesta exitosa
    return NextResponse.json({
      success: true,
      dataUrl,
      originalUrl: imageUrl,
      size: buffer.length,
      contentType: responseContentType,
    });

  } catch (error) {
    // Log del error para debugging
    console.error('[PROXY-IMAGE] Error inesperado:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor al procesar la imagen' 
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler para CORS
 */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    }
  );
}

/**
 * GET handler para información de la API
 */
export async function GET() {
  return NextResponse.json({
    message: 'Proxy de imágenes para resolver problemas de CORS',
    usage: 'POST con { imageUrl: string }',
    maxSize: '10MB',
    supportedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
    timeout: '10 segundos',
  });
}
