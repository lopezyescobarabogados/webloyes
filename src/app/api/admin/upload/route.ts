import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const type = formData.get('type') as string || 'team'; // 'team' o 'news'

    if (!image) {
      return NextResponse.json(
        { error: 'No se proporcionó ninguna imagen' },
        { status: 400 }
      );
    }

    // Validar tipo de archivo
    if (!image.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'El archivo debe ser una imagen' },
        { status: 400 }
      );
    }

    // Validar tamaño (máximo 5MB)
    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'La imagen no puede ser mayor a 5MB' },
        { status: 400 }
      );
    }

    // Crear directorio específico según el tipo
    const folderName = type === 'news' ? 'news' : 'team';
    const uploadDir = path.join(process.cwd(), 'public', 'images', folderName);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generar nombre único para el archivo
    const timestamp = Date.now();
    const originalName = image.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${timestamp}-${originalName}`;
    const filePath = path.join(uploadDir, fileName);

    // Convertir File a Buffer y guardar
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(filePath, buffer);

    // Retornar la URL de la imagen
    const imageUrl = `/images/${folderName}/${fileName}`;

    return NextResponse.json({ 
      url: imageUrl,
      message: 'Imagen subida correctamente' 
    });

  } catch (error) {
    console.error('Error al subir imagen:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
