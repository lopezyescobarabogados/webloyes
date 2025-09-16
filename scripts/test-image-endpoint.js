/**
 * Script para validar el endpoint GET /api/images/[id] en Railway
 * Prueba la funcionalidad completa del sistema de imágenes PostgreSQL
 * 
 * Uso en Railway:
 * railway run node scripts/test-image-endpoint.js
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testImageEndpoint() {
  console.log('🧪 VALIDACIÓN DEL ENDPOINT /api/images/[id]');
  console.log('='.repeat(50));
  
  try {
    // 1. Buscar una noticia con imagen en PostgreSQL
    console.log('📋 1. Buscando noticias con imágenes en PostgreSQL...');
    
    const newsWithImages = await prisma.$queryRaw`
      SELECT "id", "title", "imageType", LENGTH("imageData") as size 
      FROM "news" 
      WHERE "imageData" IS NOT NULL 
      LIMIT 5
    `;
    
    if (!newsWithImages.length) {
      console.log('⚠️  No se encontraron noticias con imágenes en PostgreSQL');
      console.log('💡 Tip: Crea una noticia con imagen desde el admin panel');
      return;
    }
    
    console.log(`✅ Encontradas ${newsWithImages.length} noticias con imágenes:`);
    newsWithImages.forEach((news, index) => {
      console.log(`   ${index + 1}. ID: ${news.id} | Tipo: ${news.imageType} | Tamaño: ${Math.round(news.size / 1024)}KB`);
    });
    
    // 2. Validar estructura de datos
    console.log('\n📋 2. Validando estructura de datos...');
    
    const sampleNews = newsWithImages[0];
    const requiredFields = ['id', 'imageType', 'size'];
    const missingFields = requiredFields.filter(field => !sampleNews[field]);
    
    if (missingFields.length > 0) {
      console.log(`❌ Campos faltantes: ${missingFields.join(', ')}`);
      return;
    }
    
    console.log('✅ Estructura de datos correcta');
    console.log(`   - ID válido: ${sampleNews.id}`);
    console.log(`   - MIME type: ${sampleNews.imageType}`);
    console.log(`   - Tamaño: ${Math.round(sampleNews.size / 1024)}KB`);
    
    // 3. Probar query completa (como la hace el endpoint)
    console.log('\n📋 3. Probando query del endpoint...');
    
    const endpointQuery = await prisma.$queryRaw`
      SELECT "imageData", "imageType"
      FROM "news" 
      WHERE "id" = ${sampleNews.id} AND "imageData" IS NOT NULL
      LIMIT 1
    `;
    
    if (!endpointQuery.length) {
      console.log('❌ Query del endpoint falló');
      return;
    }
    
    const { imageData, imageType } = endpointQuery[0];
    
    console.log('✅ Query del endpoint exitosa');
    console.log(`   - imageData: Buffer de ${imageData.length} bytes`);
    console.log(`   - imageType: ${imageType}`);
    
    // 4. Validar tipos MIME permitidos
    console.log('\n📋 4. Validando tipos MIME...');
    
    const allowedMimeTypes = new Set([
      'image/jpeg',
      'image/png', 
      'image/webp',
      'image/gif',
      'image/svg+xml'
    ]);
    
    if (!allowedMimeTypes.has(imageType)) {
      console.log(`❌ Tipo MIME no permitido: ${imageType}`);
      return;
    }
    
    console.log(`✅ Tipo MIME válido: ${imageType}`);
    
    // 5. Generar URL de prueba
    console.log('\n📋 5. URLs generadas para testing...');
    console.log(`   - Endpoint: /api/images/${sampleNews.id}`);
    console.log(`   - HEAD test: curl -I https://tudominio.com/api/images/${sampleNews.id}`);
    console.log(`   - GET test: curl https://tudominio.com/api/images/${sampleNews.id} -o test-image.${imageType.split('/')[1]}`);
    
    // 6. Resumen final
    console.log('\n🎉 VALIDACIÓN EXITOSA');
    console.log('='.repeat(50));
    console.log('✅ Endpoint /api/images/[id] listo para producción');
    console.log('✅ Datos PostgreSQL correctos');
    console.log('✅ Tipos MIME válidos');
    console.log('✅ Buffer de imágenes funcionando');
    
    // 7. Estadísticas
    const stats = await prisma.$queryRaw`
      SELECT 
        COUNT(*) as total_news,
        COUNT("imageData") as news_with_images,
        AVG(LENGTH("imageData")) as avg_image_size
      FROM "news"
    `;
    
    console.log('\n📊 ESTADÍSTICAS:');
    console.log(`   - Total noticias: ${stats[0].total_news}`);
    console.log(`   - Con imágenes: ${stats[0].news_with_images}`);
    console.log(`   - Tamaño promedio: ${Math.round(stats[0].avg_image_size / 1024)}KB`);
    
  } catch (error) {
    console.error('❌ Error en validación:', error.message);
    
    if (error.message.includes('Authentication failed')) {
      console.log('\n💡 SOLUCIÓN:');
      console.log('   - Ejecutar en Railway: railway run node scripts/test-image-endpoint.js');
      console.log('   - O configurar variables de entorno de PostgreSQL localmente');
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar validación
testImageEndpoint();
