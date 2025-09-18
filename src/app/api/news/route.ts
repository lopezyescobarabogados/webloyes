import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { processWhatsAppFormatting } from '@/utils/textFormatting'
import slugify from 'slugify'

// Tipos MIME permitidos para seguridad
const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png', 
  'image/webp',
  'image/gif'
]);

// Interface para validación
interface NewsData {
  title: string;
  content: string;
  author: string;
  category: string;
}

// Validador para campos requeridos
function validateRequiredFields(data: NewsData): string[] {
  const errors: string[] = [];
  
  if (!data.title?.trim()) errors.push('Título es requerido');
  if (!data.content?.trim()) errors.push('Contenido es requerido');
  if (!data.author?.trim()) errors.push('Autor es requerido');
  if (!data.category?.trim()) errors.push('Categoría es requerida');
  
  return errors;
}

// Sanitizador básico para prevenir XSS
function sanitizeString(str: string): string {
  return str.trim().replace(/[<>]/g, '');
}

// Sanitizador que preserva HTML seguro (solo strong permitido)
function sanitizeContent(str: string): string {
  return str.trim()
    .replace(/<(?!\/?strong\b)[^>]*>/g, '') // Remove all HTML except <strong> and </strong>
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

// Procesador seguro de tags JSON
function processTags(tagsInput: FormDataEntryValue | null): string[] {
  if (!tagsInput) return [];
  
  try {
    const parsed = JSON.parse(tagsInput as string);
    return Array.isArray(parsed) ? parsed.filter(Boolean).slice(0, 10) : [];
  } catch {
    return [];
  }
}

// GET - Obtener todas las noticias
export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    
    // Fallback para desarrollo cuando no hay base de datos
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Usando datos mock para desarrollo...')
      const mockNews = [
        {
          id: 'mock-1',
          title: 'Nueva Reforma Laboral 2025',
          slug: 'nueva-reforma-laboral-2025',
          excerpt: 'Análisis completo de los cambios más importantes en la legislación laboral colombiana.',
          content: 'La nueva reforma laboral introduce cambios significativos...',
          author: 'Dr. López Escobar',
          category: 'Derecho Laboral',
          tags: '["reforma", "laboral", "2025"]',
          published: true,
          featured: true,
          imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'mock-2',
          title: 'Cambios en el Código Civil',
          slug: 'cambios-codigo-civil',
          excerpt: 'Modificaciones recientes al Código Civil que afectan contratos.',
          content: 'El Congreso aprobó importantes modificaciones...',
          author: 'Dra. María Escobar',
          category: 'Derecho Civil',
          tags: '["código civil", "contratos"]',
          published: true,
          featured: false,
          imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'mock-3',
          title: 'Jurisprudencia Constitucional',
          slug: 'jurisprudencia-constitucional',
          excerpt: 'Análisis de las sentencias más relevantes de la Corte Constitucional.',
          content: 'La Corte Constitucional ha emitido decisiones fundamentales...',
          author: 'Dr. Carlos López',
          category: 'Derecho Constitucional',
          tags: '["jurisprudencia", "constitucional"]',
          published: true,
          featured: false,
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      return NextResponse.json(mockNews);
    }
    
    return NextResponse.json(
      { error: 'Error al obtener las noticias' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva noticia con FormData e imagen binaria O JSON
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    
    let title: string, content: string, excerpt: string, author: string, category: string;
    let tags: string[], published: boolean, featured: boolean;
    let imageFile: File | null = null;

    // Detectar si es FormData o JSON
    if (contentType.includes('multipart/form-data')) {
      // Manejo de FormData (con imagen)
      const formData = await request.formData();
      
      title = sanitizeString(formData.get('title') as string || '');
      content = formData.get('content') as string || '';
      excerpt = sanitizeString(formData.get('excerpt') as string || content.substring(0, 200));
      author = sanitizeString(formData.get('author') as string || '');
      category = sanitizeString(formData.get('category') as string || '');
      tags = processTags(formData.get('tags'));
      published = formData.get('published') === 'true';
      featured = formData.get('featured') === 'true';
      imageFile = formData.get('image') as File | null;
      
      // Procesar formato WhatsApp en contenido FormData también
      content = processWhatsAppFormatting(content);
      content = sanitizeContent(content);
    } else {
      // Manejo de JSON (sin imagen)
      const body = await request.json();
      
      title = sanitizeString(body.title || '');
      content = body.content || '';
      excerpt = sanitizeString(body.excerpt || content.substring(0, 200));
      author = sanitizeString(body.author || '');
      category = sanitizeString(body.category || '');
      tags = Array.isArray(body.tags) ? body.tags : [];
      published = Boolean(body.published);
      featured = Boolean(body.featured);
      
      // Procesar tags si viene como string JSON
      if (typeof body.tags === 'string') {
        try {
          tags = JSON.parse(body.tags);
        } catch {
          tags = [];
        }
      }
      
      // Procesar formato WhatsApp en contenido (IMPORTANTE: no sanitizar antes)
      content = processWhatsAppFormatting(content);
      
      // Ahora sí sanitizar después del procesamiento (preservando <strong>)
      content = sanitizeContent(content);
    }

    // Validar campos requeridos
    const errors = validateRequiredFields({ title, content, author, category });
    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: errors },
        { status: 400 }
      );
    }

    // Generar slug único y seguro
    let slug = slugify(title, { 
      lower: true, 
      strict: true,
      remove: /[*+~.()'"!:@]/g 
    });
    
    // Verificar unicidad del slug
    const existingNews = await prisma.news.findUnique({
      where: { slug }
    });
    
    if (existingNews) {
      slug = `${slug}-${Date.now()}`;
    }

    // Procesar imagen si existe
    let imageData: Buffer | null = null;
    let imageType: string | null = null;

    if (imageFile && imageFile.size > 0) {
      // Validaciones de imagen
      if (!ALLOWED_IMAGE_TYPES.has(imageFile.type)) {
        return NextResponse.json(
          { error: `Tipo de imagen no permitido. Permitidos: ${Array.from(ALLOWED_IMAGE_TYPES).join(', ')}` },
          { status: 400 }
        );
      }

      if (imageFile.size > 10 * 1024 * 1024) { // 10MB máximo
        return NextResponse.json(
          { error: 'La imagen no puede ser mayor a 10MB' },
          { status: 400 }
        );
      }

      // Convertir a Buffer para PostgreSQL BYTEA
      const arrayBuffer = await imageFile.arrayBuffer();
      imageData = Buffer.from(arrayBuffer);
      imageType = imageFile.type;
    }

    // Crear noticia con transacción para consistencia
    const news = await prisma.$transaction(async (tx) => {
      // Crear registro inicial
      const newNews = await tx.news.create({
        data: {
          title,
          slug,
          excerpt,
          content,
          author,
          category,
          tags: JSON.stringify(tags),
          published,
          featured,
          imageUrl: imageData ? '' : null, // Placeholder, se actualizará
        }
      });

      // Actualizar con datos binarios si hay imagen
      if (imageData && imageType) {
        await tx.$executeRaw`
          UPDATE "news" 
          SET "imageData" = ${imageData}, 
              "imageType" = ${imageType},
              "imageUrl" = ${`/api/images/${newNews.id}`}
          WHERE "id" = ${newNews.id}
        `;
        
        // Actualizar objeto para respuesta
        newNews.imageUrl = `/api/images/${newNews.id}`;
      }

      return newNews;
    });

    return NextResponse.json(news, { status: 201 });

  } catch (error) {
    console.error('[NEWS-CREATE] Error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
