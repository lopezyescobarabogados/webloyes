import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { prisma } from '@/lib/prisma';

// Configuración de la ruta API
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const newsId = formData.get('newsId') as string;

    if (!file || !newsId) {
      return NextResponse.json({ error: 'Archivo y noticia requeridos' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Solo PDF permitido' }, { status: 400 });
    }

    // Crear directorio si no existe
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'pdfs');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generar nombre único
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = join(uploadsDir, fileName);

    // Guardar archivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Actualizar noticia con PDF
    await prisma.news.update({
      where: { id: newsId },
      data: {
        pdfUrl: `/uploads/pdfs/${fileName}`,
        pdfName: file.name
      } as { pdfUrl: string; pdfName: string } // Fix específico para campos PDF
    });

    return NextResponse.json({ 
      success: true,
      pdfUrl: `/uploads/pdfs/${fileName}`,
      pdfName: file.name
    });

  } catch (error) {
    console.error('Error uploading PDF:', error);
    return NextResponse.json({ error: 'Error al subir PDF' }, { status: 500 });
  }
}
