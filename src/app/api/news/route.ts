import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import slugify from 'slugify'
import { validateNewsData, sanitizeNewsData } from '@/utils/backend-image-validation'

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

    // Validar datos de entrada incluyendo URL de imagen
    const validation = validateNewsData({
      title,
      excerpt: excerpt || content, // Usar excerpt o content como fallback
      author,
      category: Array.isArray(category) ? category[0] : category,
      imageUrl
    });

    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: 'Datos inválidos',
          details: validation.errors
        },
        { status: 400 }
      );
    }

    // Sanitizar y preparar datos
    const sanitizedData = sanitizeNewsData({
      title,
      excerpt: excerpt || content,
      author,
      category: Array.isArray(category) ? category[0] : category,
      imageUrl
    });

    // Debug: verificar el tipo de category
    console.log('Category received:', category, 'Type:', typeof category, 'Is Array:', Array.isArray(category))

    // Generar slug único
    let slug = slugify(sanitizedData.title, { lower: true, strict: true })
    
    // Verificar si el slug ya existe
    const existingNews = await prisma.news.findUnique({
      where: { slug }
    })

    if (existingNews) {
      slug = `${slug}-${Date.now()}`
    }

    const news = await prisma.news.create({
      data: {
        title: sanitizedData.title,
        slug,
        excerpt: sanitizedData.excerpt,
        content: content || sanitizedData.excerpt,
        author: sanitizedData.author,
        category: sanitizedData.category,
        tags: JSON.stringify(tags || []),
        published: published || false,
        featured: featured || false,
        imageUrl: sanitizedData.imageUrl
      }
    })

    // Log si la imagen necesita procesamiento
    if (sanitizedData.needsImageProcessing && sanitizedData.imageUrl) {
      console.log('Image needs processing:', sanitizedData.imageUrl);
    }

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    console.error('Error creating news:', error)
    return NextResponse.json(
      { error: 'Error al crear la noticia' },
      { status: 500 }
    )
  }
}
