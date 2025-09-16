/**
 * Script para migrar noticias con rutas locales de filesystem a URLs de API
 * Convierte imageUrl de '/images/news/file.jpg' a '/api/images/:id'
 * 
 * Uso:
 * - Railway: railway run npm run fix:images
 * - Local: npm run fix:images
 * - Dry run: npm run fix:images:dry
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Configuración del script
const SCRIPT_CONFIG = {
  // Modo dry-run por defecto (cambiar a false para aplicar cambios)
  dryRun: process.argv.includes('--dry-run'),
  
  // Patrones de URLs problemáticas
  problematicPatterns: [
    '/images/news/',
    '/public/images/',
    './images/',
    '../images/',
  ],
  
  // Tipos de archivos de imagen válidos
  imageExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
  
  // Límite de noticias a procesar por lote
  batchSize: 50,
};

/**
 * Genera la nueva URL de API para una noticia
 */
function generateApiUrl(newsId) {
  return `/api/images/${newsId}`;
}

/**
 * Busca noticias con URLs problemáticas
 */
async function findProblematicNews() {
  console.log('🔍 Buscando noticias con URLs problemáticas...');
  
  // Query para encontrar noticias con rutas del filesystem
  const problematicNews = await prisma.$queryRaw`
    SELECT 
      "id",
      "title", 
      "imageUrl",
      "createdAt",
      CASE WHEN "imageData" IS NOT NULL THEN true ELSE false END as "hasImageData"
    FROM "news" 
    WHERE "imageUrl" LIKE '/images/news/%' 
       OR "imageUrl" LIKE '/public/images/%'
       OR "imageUrl" LIKE './images/%'
       OR "imageUrl" LIKE '../images/%'
    ORDER BY "createdAt" DESC
  `;
  
  console.log(`📋 Encontradas ${problematicNews.length} noticias con URLs problemáticas`);
  
  return problematicNews;
}

/**
 * Analiza las noticias problemáticas
 */
function analyzeProblematicNews(news) {
  console.log('\n📊 ANÁLISIS DE NOTICIAS PROBLEMÁTICAS:');
  console.log('='.repeat(60));
  
  const byPattern = SCRIPT_CONFIG.problematicPatterns.reduce((acc, pattern) => {
    acc[pattern] = news.filter(n => n.imageUrl.includes(pattern)).length;
    return acc;
  }, {});
  
  console.log('📂 Por patrón de URL:');
  Object.entries(byPattern).forEach(([pattern, count]) => {
    if (count > 0) {
      console.log(`   ${pattern}: ${count} noticias`);
    }
  });
  
  const withImageData = news.filter(n => n.hasImageData).length;
  const withoutImageData = news.length - withImageData;
  
  console.log('\n💾 Por disponibilidad de datos:');
  console.log(`   Con imageData en PostgreSQL: ${withImageData}`);
  console.log(`   Sin imageData (solo URL): ${withoutImageData}`);
  
  if (news.length > 0) {
    console.log('\n📝 Ejemplos de URLs problemáticas:');
    news.slice(0, 5).forEach((item, index) => {
      const status = item.hasImageData ? '✅ Con datos' : '❌ Sin datos';
      console.log(`   ${index + 1}. ${item.title.substring(0, 40)}...`);
      console.log(`      URL: ${item.imageUrl}`);
      console.log(`      Estado: ${status}`);
      console.log('');
    });
  }
}

/**
 * Migra una noticia individual
 */
async function migrateNewsImage(news) {
  try {
    const newImageUrl = generateApiUrl(news.id);
    
    if (SCRIPT_CONFIG.dryRun) {
      console.log(`   [DRY-RUN] ${news.id}: ${news.imageUrl} → ${newImageUrl}`);
      return true;
    }
    
    await prisma.news.update({
      where: { id: news.id },
      data: { imageUrl: newImageUrl }
    });
    
    console.log(`   ✅ ${news.id}: Migrado a ${newImageUrl}`);
    return true;
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error(`   ❌ ${news.id}: Error - ${errorMessage}`);
    return false;
  }
}

/**
 * Procesa la migración en lotes
 */
async function processMigration(news) {
  console.log('\n🔄 INICIANDO MIGRACIÓN:');
  console.log('='.repeat(60));
  
  if (SCRIPT_CONFIG.dryRun) {
    console.log('⚠️  MODO DRY-RUN: No se aplicarán cambios reales');
  }
  
  const result = {
    totalFound: news.length,
    successfulMigrations: 0,
    errors: [],
    skipped: 0
  };
  
  // Procesar en lotes
  for (let i = 0; i < news.length; i += SCRIPT_CONFIG.batchSize) {
    const batch = news.slice(i, i + SCRIPT_CONFIG.batchSize);
    
    console.log(`\n📦 Procesando lote ${Math.floor(i / SCRIPT_CONFIG.batchSize) + 1}/${Math.ceil(news.length / SCRIPT_CONFIG.batchSize)} (${batch.length} noticias):`);
    
    for (const newsItem of batch) {
      // Solo migrar si tiene datos de imagen en PostgreSQL
      if (!newsItem.hasImageData) {
        console.log(`   ⏭️  ${newsItem.id}: Omitido (sin imageData en PostgreSQL)`);
        result.skipped++;
        continue;
      }
      
      const success = await migrateNewsImage(newsItem);
      if (success) {
        result.successfulMigrations++;
      } else {
        result.errors.push(`Error migrando ${newsItem.id}: ${newsItem.title}`);
      }
    }
    
    // Pausa pequeña entre lotes para no sobrecargar la DB
    if (i + SCRIPT_CONFIG.batchSize < news.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return result;
}

/**
 * Valida los resultados después de la migración
 */
async function validateMigration() {
  console.log('\n🔍 VALIDANDO MIGRACIÓN...');
  
  const remainingProblematic = await findProblematicNews();
  
  if (remainingProblematic.length === 0) {
    console.log('✅ Validación exitosa: No quedan URLs problemáticas');
  } else {
    console.log(`⚠️  Quedan ${remainingProblematic.length} URLs problemáticas por migrar`);
    remainingProblematic.slice(0, 3).forEach(item => {
      console.log(`   - ${item.id}: ${item.imageUrl}`);
    });
  }
  
  // Verificar que las URLs migradas apunten al endpoint correcto
  const migratedNews = await prisma.$queryRaw`
    SELECT "id", "imageUrl" 
    FROM "news" 
    WHERE "imageUrl" LIKE '/api/images/%'
    LIMIT 10
  `;
  
  console.log(`\n📊 URLs de API encontradas: ${migratedNews.length}`);
  if (migratedNews.length > 0) {
    console.log('   Ejemplos:');
    migratedNews.slice(0, 3).forEach(item => {
      console.log(`   - ${item.id}: ${item.imageUrl}`);
    });
  }
}

/**
 * Genera reporte final
 */
function generateReport(result) {
  console.log('\n📊 REPORTE FINAL:');
  console.log('='.repeat(60));
  console.log(`📋 Total encontradas: ${result.totalFound}`);
  console.log(`✅ Migradas exitosamente: ${result.successfulMigrations}`);
  console.log(`⏭️  Omitidas (sin datos): ${result.skipped}`);
  console.log(`❌ Errores: ${result.errors.length}`);
  
  if (result.errors.length > 0) {
    console.log('\n❌ ERRORES ENCONTRADOS:');
    result.errors.forEach((error, index) => {
      console.log(`   ${index + 1}. ${error}`);
    });
  }
  
  const successRate = result.totalFound > 0 
    ? Math.round((result.successfulMigrations / result.totalFound) * 100)
    : 0;
  
  console.log(`\n📈 Tasa de éxito: ${successRate}%`);
  
  if (SCRIPT_CONFIG.dryRun) {
    console.log('\n💡 PRÓXIMOS PASOS:');
    console.log('   1. Revisar el análisis anterior');
    console.log('   2. Ejecutar sin --dry-run para aplicar cambios:');
    console.log('      railway run npm run fix:images');
  } else {
    console.log('\n🎉 MIGRACIÓN COMPLETADA');
    console.log('   Las noticias ahora usan URLs de API: /api/images/:id');
    console.log('   Las imágenes se servirán desde PostgreSQL');
  }
}

/**
 * Función principal
 */
async function main() {
  console.log('🔧 SCRIPT DE MIGRACIÓN DE IMÁGENES');
  console.log('='.repeat(60));
  console.log(`📅 Fecha: ${new Date().toISOString()}`);
  console.log(`🎯 Modo: ${SCRIPT_CONFIG.dryRun ? 'DRY-RUN' : 'APLICAR CAMBIOS'}`);
  
  try {
    // 1. Buscar noticias problemáticas
    const problematicNews = await findProblematicNews();
    
    if (problematicNews.length === 0) {
      console.log('\n🎉 ¡Excelente! No se encontraron noticias con URLs problemáticas');
      console.log('   Todas las noticias ya usan el sistema de API correcto');
      return;
    }
    
    // 2. Analizar noticias encontradas
    analyzeProblematicNews(problematicNews);
    
    // 3. Procesar migración
    const result = await processMigration(problematicNews);
    
    // 4. Validar migración (solo si no es dry-run)
    if (!SCRIPT_CONFIG.dryRun && result.successfulMigrations > 0) {
      await validateMigration();
    }
    
    // 5. Generar reporte final
    generateReport(result);
    
  } catch (error) {
    console.error('\n💥 ERROR CRÍTICO:', error instanceof Error ? error.message : 'Error desconocido');
    
    if (error instanceof Error && error.message.includes('Authentication failed')) {
      console.log('\n💡 SOLUCIÓN:');
      console.log('   - Ejecutar en Railway: railway run npm run fix:images');
      console.log('   - O configurar variables de entorno de PostgreSQL');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('\n🏁 Script finalizado');
  }
}

// Ejecutar script
main();
