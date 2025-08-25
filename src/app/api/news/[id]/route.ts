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
