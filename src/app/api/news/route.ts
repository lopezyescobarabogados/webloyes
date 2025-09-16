import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
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
    return NextResponse.json(
      { error: 'Error al obtener las noticias' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva noticia con FormData e imagen binaria
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extraer campos del FormData
    const title = sanitizeString(formData.get('title') as string || '');
    const content = sanitizeString(formData.get('content') as string || '');
    const excerpt = sanitizeString(formData.get('excerpt') as string || content.substring(0, 200));
    const author = sanitizeString(formData.get('author') as string || '');
    const category = sanitizeString(formData.get('category') as string || '');
    const tags = processTags(formData.get('tags'));
    const published = formData.get('published') === 'true';
    const featured = formData.get('featured') === 'true';
    const imageFile = formData.get('image') as File | null;

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
