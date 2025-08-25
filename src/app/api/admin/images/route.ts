import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'news');

    // Verificar si el directorio existe
    if (!fs.existsSync(imagesDir)) {
      // Crear el directorio si no existe
      fs.mkdirSync(imagesDir, { recursive: true });
      return NextResponse.json({ images: [] });
    }

    // Leer archivos del directorio
    const files = fs.readdirSync(imagesDir);

    // Filtrar solo archivos de imagen
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const images = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      })
      .map(file => `/images/news/${file}`);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading images directory:', error);
    return NextResponse.json(
      { error: 'Error al cargar las imágenes' },
      { status: 500 }
    );
  }
}
