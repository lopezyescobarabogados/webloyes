/**
 * Script de verificación post-migración
 * Verifica que las imágenes migradas funcionen correctamente
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Verifica el estado de las imágenes migradas
 */
async function verifyMigration() {
  console.log('🔍 VERIFICANDO MIGRACIÓN DE IMÁGENES');
  console.log('====================================');
  
  try {
    await prisma.$connect();
    
    // Contar noticias con imágenes
    const newsWithImages = await prisma.news.findMany({
      where: {
        OR: [
          { imageData: { not: null } },
          { imageUrl: { not: null } }
        ]
      },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        imageType: true,
        imageData: true
      }
    });
    
    console.log(`📊 Total de noticias con imágenes: ${newsWithImages.length}`);
    
    let migratedCount = 0;
    let externalCount = 0;
    let missingCount = 0;
    
    for (const news of newsWithImages) {
      const hasImageData = news.imageData !== null;
      const isApiUrl = news.imageUrl?.startsWith('/api/images/');
      const isExternalUrl = news.imageUrl?.startsWith('http');
      
      if (hasImageData) {
        migratedCount++;
        console.log(`✅ ${news.title} - Migrada a PostgreSQL (${news.imageType})`);
        
        if (!isApiUrl) {
          console.log(`   ⚠️  URL no actualizada: ${news.imageUrl}`);
        }
      } else if (isExternalUrl) {
        externalCount++;
        console.log(`🌐 ${news.title} - URL externa: ${news.imageUrl}`);
      } else {
        missingCount++;
        console.log(`❌ ${news.title} - Sin imagen binaria: ${news.imageUrl}`);
      }
    }
    
    console.log('');
    console.log('📈 RESUMEN:');
    console.log(`   ✅ Migradas a PostgreSQL: ${migratedCount}`);
    console.log(`   🌐 URLs externas: ${externalCount}`);
    console.log(`   ❌ Faltantes/Error: ${missingCount}`);
    
    if (missingCount === 0) {
      console.log('');
      console.log('🎉 ¡MIGRACIÓN EXITOSA! Todas las imágenes están disponibles.');
    } else {
      console.log('');
      console.log('⚠️  Hay imágenes que requieren atención.');
    }
    
  } catch (error) {
    console.error('💥 Error verificando migración:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar verificación
verifyMigration();
