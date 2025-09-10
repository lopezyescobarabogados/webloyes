import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import slugify from 'slugify'

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

// POST - Crear nueva noticia
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, excerpt, content, author, category, tags, published, featured, imageUrl } = body

    // Debug: verificar el tipo de category
    console.log('Category received:', category, 'Type:', typeof category, 'Is Array:', Array.isArray(category))

    // Asegurar que category sea siempre string
    const normalizedCategory = Array.isArray(category) ? category[0] : category

    // Generar slug único
    let slug = slugify(title, { lower: true, strict: true })
    
    // Verificar si el slug ya existe
    const existingNews = await prisma.news.findUnique({
      where: { slug }
    })

    if (existingNews) {
      slug = `${slug}-${Date.now()}`
    }

    const news = await prisma.news.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        author,
        category: normalizedCategory,
        tags: JSON.stringify(tags || []),
        published: published || false,
        featured: featured || false,
        imageUrl
      }
    })

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    console.error('Error creating news:', error)
    return NextResponse.json(
      { error: 'Error al crear la noticia' },
      { status: 500 }
    )
  }
}
