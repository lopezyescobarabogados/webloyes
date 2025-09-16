/**
 * Script de diagnóstico para identificar imágenes con rutas de filesystem
 * Detecta noticias que tienen imageUrl apuntando a /images/ en lugar de /api/images/
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Diagnóstica el estado actual de las imágenes en la base de datos
 */
async function diagnoseImageIssues() {
  console.log('🔍 DIAGNÓSTICO DE IMÁGENES - López y Escobar Abogados');
  console.log('======================================================');
  console.log(`📅 Fecha: ${new Date().toISOString()}`);
  console.log('');

  try {
    await prisma.$connect();
    console.log('✅ Conexión a PostgreSQL establecida');
    console.log('');

    // Obtener todas las noticias con sus datos de imagen
    const allNews = await prisma.news.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        imageData: true,
        imageType: true,
        published: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log(`📊 Total de noticias encontradas: ${allNews.length}`);
    console.log('');

    // Categorizar noticias por estado de imagen
    let withFilesystemUrls = 0;
    let withApiUrls = 0;
    let withExternalUrls = 0;
    let withoutImages = 0;
    let withBinaryData = 0;
    let brokenImages = 0;

    const categories = {
      filesystem: [],
      api: [],
      external: [],
      none: [],
      binary: [],
      broken: []
    };

    for (const news of allNews) {
      const hasImageData = news.imageData !== null;
      const hasImageUrl = news.imageUrl !== null && news.imageUrl !== '';

      if (hasImageData) {
        withBinaryData++;
        categories.binary.push(news);
      }

      if (hasImageUrl) {
        if (news.imageUrl.startsWith('/images/')) {
          // Imagen en filesystem (PROBLEMA)
          withFilesystemUrls++;
          categories.filesystem.push(news);
        } else if (news.imageUrl.startsWith('/api/images/')) {
          // Imagen en API PostgreSQL (CORRECTO)
          withApiUrls++;
          categories.api.push(news);
        } else if (news.imageUrl.startsWith('http')) {
          // URL externa (VÁLIDO)
          withExternalUrls++;
          categories.external.push(news);
        } else {
          // URL inválida o corrupta
          brokenImages++;
          categories.broken.push(news);
        }
      } else {
        // Sin imagen
        withoutImages++;
        categories.none.push(news);
      }
    }

    // Mostrar resumen
    console.log('📈 RESUMEN POR CATEGORÍAS:');
    console.log('==========================');
    console.log(`🚨 Filesystem URLs (PROBLEMA): ${withFilesystemUrls}`);
    console.log(`✅ API URLs (CORRECTO): ${withApiUrls}`);
    console.log(`🌐 URLs externas (VÁLIDO): ${withExternalUrls}`);
    console.log(`💾 Con datos binarios: ${withBinaryData}`);
    console.log(`❌ URLs rotas/inválidas: ${brokenImages}`);
    console.log(`📝 Sin imagen: ${withoutImages}`);
    console.log('');

    // Detalles de problemas
    if (withFilesystemUrls > 0) {
      console.log('🚨 NOTICIAS CON PROBLEMAS DE FILESYSTEM:');
      console.log('==========================================');
      categories.filesystem.forEach((news, index) => {
        console.log(`${index + 1}. "${news.title}"`);
        console.log(`   ID: ${news.id}`);
        console.log(`   URL problemática: ${news.imageUrl}`);
        console.log(`   Fecha: ${news.createdAt}`);
        console.log(`   Estado: ${news.published ? 'Publicada' : 'Borrador'}`);
        console.log(`   Datos binarios: ${news.imageData ? 'SÍ' : 'NO'}`);
        console.log('');
      });
    }

    if (categories.api.length > 0) {
      console.log('✅ NOTICIAS CON API URLS (FUNCIONANDO):');
      console.log('========================================');
      categories.api.slice(0, 3).forEach((news, index) => {
        console.log(`${index + 1}. "${news.title}" → ${news.imageUrl}`);
      });
      if (categories.api.length > 3) {
        console.log(`   ... y ${categories.api.length - 3} más`);
      }
      console.log('');
    }

    // Verificar estructura de tabla
    console.log('🗄️  VERIFICACIÓN DE ESQUEMA:');
    console.log('==============================');
    try {
      const tableInfo = await prisma.$queryRaw`
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'news' 
        AND column_name IN ('imageUrl', 'imageData', 'imageType')
        ORDER BY column_name;
      `;
      console.log('Columnas de imagen encontradas:');
      console.log(tableInfo);
    } catch (error) {
      console.log('❌ Error verificando esquema:', error.message);
    }
    console.log('');

    // Recomendaciones
    console.log('💡 RECOMENDACIONES:');
    console.log('====================');
    
    if (withFilesystemUrls > 0) {
      console.log('🔧 ACCIONES REQUERIDAS:');
      console.log(`   1. Ejecutar migración: railway run npm run migrate:images`);
      console.log(`   2. Esto convertirá ${withFilesystemUrls} imágenes problemáticas`);
      console.log(`   3. Las URLs cambiarán de /images/... a /api/images/[id]`);
      console.log('');
    }

    if (withBinaryData === 0 && withFilesystemUrls > 0) {
      console.log('⚠️  ESTADO CRÍTICO:');
      console.log('   - Hay imágenes con rutas filesystem pero sin datos binarios');
      console.log('   - Estas imágenes están completamente rotas en Railway');
      console.log('   - Requiere migración URGENTE');
      console.log('');
    }

    if (withApiUrls > 0) {
      console.log('✅ SISTEMA FUNCIONANDO:');
      console.log(`   - ${withApiUrls} imágenes ya migradas correctamente`);
      console.log('   - Estas imágenes funcionan perfectamente en Railway');
      console.log('');
    }

    // Estado general
    const healthScore = Math.round(((withApiUrls + withExternalUrls) / allNews.length) * 100);
    console.log('🎯 ESTADO GENERAL DEL SISTEMA:');
    console.log('===============================');
    console.log(`   Salud del sistema: ${healthScore}%`);
    
    if (healthScore >= 80) {
      console.log('   🟢 Estado: BUENO - Mayoría de imágenes funcionando');
    } else if (healthScore >= 50) {
      console.log('   🟡 Estado: REGULAR - Requiere migración parcial');
    } else {
      console.log('   🔴 Estado: CRÍTICO - Requiere migración urgente');
    }

    console.log('');
    console.log('📞 PARA RESOLVER:');
    console.log('   railway run npm run migrate:images:dry  # Probar migración');
    console.log('   railway run npm run migrate:images      # Ejecutar migración');
    console.log('   railway run npm run migrate:verify      # Verificar resultado');

  } catch (error) {
    console.error('💥 ERROR en diagnóstico:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar diagnóstico
if (import.meta.url === `file://${process.argv[1]}`) {
  diagnoseImageIssues()
    .then(() => {
      console.log('');
      console.log('🏁 Diagnóstico completado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Error fatal:', error);
      process.exit(1);
    });
}

export { diagnoseImageIssues };
