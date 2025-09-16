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
interface NewsUpdateData {
  title: string;
  content: string;
  author: string;
  category: string;
}

// Validador para campos requeridos
function validateRequiredFields(data: NewsUpdateData): string[] {
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

// GET - Obtener noticia por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const news = await prisma.news.findUnique({
      where: { id }
    })

    if (!news) {
      return NextResponse.json(
        { error: 'Noticia no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Error al obtener la noticia' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar noticia con FormData e imagen binaria
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verificar que el ID sea válido
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'ID de noticia inválido' },
        { status: 400 }
      );
    }

    // Verificar que la noticia existe antes de procesar
    const existingNews = await prisma.news.findUnique({
      where: { id },
      select: { id: true, title: true, slug: true }
    });

    if (!existingNews) {
      return NextResponse.json(
        { error: 'Noticia no encontrada' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    
    // Extraer y sanitizar campos del FormData
    const title = sanitizeString(formData.get('title') as string || '');
    const content = sanitizeString(formData.get('content') as string || '');
    const excerpt = sanitizeString(formData.get('excerpt') as string || content.substring(0, 200));
    const author = sanitizeString(formData.get('author') as string || '');
    const category = sanitizeString(formData.get('category') as string || '');
    const tags = processTags(formData.get('tags'));
    const published = formData.get('published') === 'true';
    const featured = formData.get('featured') === 'true';
    const imageFile = formData.get('image') as File | null;
    const removeImage = formData.get('removeImage') === 'true'; // Flag para eliminar imagen

    // Validar campos requeridos
    const errors = validateRequiredFields({ title, content, author, category });
    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: errors },
        { status: 400 }
      );
    }

    // Generar nuevo slug si el título cambió
    let slug = existingNews.slug;
    if (title !== existingNews.title) {
      slug = slugify(title, { 
        lower: true, 
        strict: true,
        remove: /[*+~.()'"!:@]/g 
      });
      
      // Verificar unicidad del nuevo slug
      const slugExists = await prisma.news.findUnique({
        where: { slug, NOT: { id } }
      });

      if (slugExists) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    // Procesar imagen: nueva, eliminar, o mantener existente
    let imageData: Buffer | null = null;
    let imageType: string | null = null;
    let shouldUpdateImage = false;
    let finalImageUrl: string | null = null;

    if (removeImage) {
      // Eliminar imagen existente
      shouldUpdateImage = true;
      finalImageUrl = null;
    } else if (imageFile && imageFile.size > 0) {
      // Nueva imagen proporcionada
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
      shouldUpdateImage = true;
      finalImageUrl = `/api/images/${id}`;
    }
    // Si no hay imageFile ni removeImage, mantener imagen existente (no cambios)

    // Actualizar con transacción para consistencia
    const updatedNews = await prisma.$transaction(async (tx) => {
      // Actualizar campos de texto
      const newsUpdate = await tx.news.update({
        where: { id },
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
          ...(shouldUpdateImage ? { imageUrl: finalImageUrl } : {})
        }
      });

      // Actualizar datos binarios si es necesario
      if (shouldUpdateImage) {
        if (imageData && imageType) {
          // Nueva imagen
          await tx.$executeRaw`
            UPDATE "news" 
            SET "imageData" = ${imageData}, 
                "imageType" = ${imageType}
            WHERE "id" = ${id}
          `;
        } else {
          // Eliminar imagen
          await tx.$executeRaw`
            UPDATE "news" 
            SET "imageData" = NULL, 
                "imageType" = NULL
            WHERE "id" = ${id}
          `;
        }
      }

      return newsUpdate;
    });

    return NextResponse.json(updatedNews);

  } catch (error) {
    console.error('[NEWS-UPDATE] Error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar noticia
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existingNews = await prisma.news.findUnique({
      where: { id }
    })

    if (!existingNews) {
      return NextResponse.json(
        { error: 'Noticia no encontrada' },
        { status: 404 }
      )
    }

    await prisma.news.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Noticia eliminada exitosamente' })
  } catch (error) {
    console.error('Error deleting news:', error)
    return NextResponse.json(
      { error: 'Error al eliminar la noticia' },
      { status: 500 }
    )
  }
}
