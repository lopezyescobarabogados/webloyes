import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import slugify from 'slugify'

// GET - Obtener noticia por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Intenta obtener noticia con campos PDF, maneja el error si no existen
    let news;
    try {
      news = await prisma.news.findUnique({
        where: { id }
      });
    } catch (dbError: unknown) {
      // Si el error es por campos PDF que no existen, hacer consulta sin esos campos
      const errorMessage = dbError instanceof Error ? dbError.message : String(dbError);
      const errorCode = (dbError as { code?: string })?.code;
      
      if (errorCode === 'P2022' && errorMessage.includes('pdfUrl')) {
        console.log('⚠️ Campos PDF no existen aún en admin single, usando consulta compatible...');
        news = await prisma.news.findUnique({
          where: { id },
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            content: true,
            author: true,
            category: true,
            tags: true,
            published: true,
            featured: true,
            imageUrl: true,
            imageData: true,
            imageType: true,
            createdAt: true,
            updatedAt: true,
            // No incluir pdfUrl y pdfName si no existen
          }
        });
      } else {
        throw dbError;
      }
    }

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

// PUT - Actualizar noticia
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json()
    const { title, excerpt, content, author, category, tags, published, featured, imageUrl } = body

    // Verificar si la noticia existe
    const existingNews = await prisma.news.findUnique({
      where: { id }
    })

    if (!existingNews) {
      return NextResponse.json(
        { error: 'Noticia no encontrada' },
        { status: 404 }
      )
    }

    // Generar nuevo slug si el título cambió
    let slug = existingNews.slug
    if (title !== existingNews.title) {
      slug = slugify(title, { lower: true, strict: true })
      
      // Verificar si el nuevo slug ya existe
      const slugExists = await prisma.news.findUnique({
        where: { slug, NOT: { id } }
      })

      if (slugExists) {
        slug = `${slug}-${Date.now()}`
      }
    }

    const updatedNews = await prisma.news.update({
      where: { id },
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
    })

    return NextResponse.json(updatedNews)
  } catch (error) {
    console.error('Error updating news:', error)
    return NextResponse.json(
      { error: 'Error al actualizar la noticia' },
      { status: 500 }
    )
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
