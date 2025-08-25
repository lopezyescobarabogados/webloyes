import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import slugify from 'slugify';

// GET - Obtener todas las noticias
export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json({ news });
  } catch (error) {
    console.error('Error getting news:', error);
    return NextResponse.json(
      { error: 'Error al obtener las noticias' },
      { status: 500 }
    );
  }
}

// POST - Crear nueva noticia
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, excerpt, content, author, category, tags, published, featured, imageUrl } = body;

    // Validar campos requeridos
    if (!title || !excerpt || !content || !author || !category) {
      return NextResponse.json(
        { error: 'Campos requeridos: title, excerpt, content, author, category' },
        { status: 400 }
      );
    }

    // Validar longitudes
    if (title.length > 200) {
      return NextResponse.json(
        { error: 'El título no puede superar 200 caracteres' },
        { status: 400 }
      );
    }

    if (excerpt.length > 500) {
      return NextResponse.json(
        { error: 'El resumen no puede superar 500 caracteres' },
        { status: 400 }
      );
    }

    if (content.length > 50000) {
      return NextResponse.json(
        { error: 'El contenido no puede superar 50,000 caracteres' },
        { status: 400 }
      );
    }

    // Generar slug único
    let slug = slugify(title, { lower: true, strict: true });
    
    // Verificar si el slug ya existe
    const existingNews = await prisma.news.findUnique({
      where: { slug }
    });

    if (existingNews) {
      slug = `${slug}-${Date.now()}`;
    }

    // Crear nueva noticia
    const news = await prisma.news.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        author,
        category,
        tags: JSON.stringify(tags || []),
        published: published || false,
        featured: featured || false,
        imageUrl
      }
    });

    console.info('Nueva noticia creada:', {
      id: news.id,
      title: news.title,
      slug: news.slug,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { error: 'Error al crear la noticia' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar noticia
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, excerpt, content, author, category, tags, published, featured, imageUrl } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID de la noticia requerido' },
        { status: 400 }
      );
    }

    // Verificar si la noticia existe
    const existingNews = await prisma.news.findUnique({
      where: { id }
    });

    if (!existingNews) {
      return NextResponse.json(
        { error: 'Noticia no encontrada' },
        { status: 404 }
      );
    }

    // Generar nuevo slug si se actualiza el título
    let newSlug = existingNews.slug;
    if (title && title !== existingNews.title) {
      newSlug = slugify(title, { lower: true, strict: true });
      
      // Verificar si el nuevo slug ya existe
      const slugExists = await prisma.news.findFirst({
        where: { 
          slug: newSlug,
          id: { not: id }
        }
      });

      if (slugExists) {
        newSlug = `${newSlug}-${Date.now()}`;
      }
    }

    // Actualizar noticia
    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(title && title !== existingNews.title && { slug: newSlug }),
        ...(excerpt && { excerpt }),
        ...(content && { content }),
        ...(author && { author }),
        ...(category && { category }),
        ...(tags !== undefined && { tags: JSON.stringify(tags) }),
        ...(published !== undefined && { published }),
        ...(featured !== undefined && { featured }),
        ...(imageUrl !== undefined && { imageUrl })
      }
    });

    console.info('Noticia actualizada:', {
      id: updatedNews.id,
      title: updatedNews.title,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(updatedNews);
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la noticia' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar noticia
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID de la noticia requerido' },
        { status: 400 }
      );
    }

    // Verificar si la noticia existe
    const existingNews = await prisma.news.findUnique({
      where: { id }
    });

    if (!existingNews) {
      return NextResponse.json(
        { error: 'Noticia no encontrada' },
        { status: 404 }
      );
    }

    // Eliminar noticia
    await prisma.news.delete({
      where: { id }
    });

    console.info('Noticia eliminada:', {
      id,
      title: existingNews.title,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'Noticia eliminada correctamente' });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la noticia' },
      { status: 500 }
    );
  }
}
