/**
 * Script de migración para transferir imágenes de /public/images a PostgreSQL
 * Convierte archivos locales a BYTEA y actualiza referencias en la base de datos
 * 
 * Uso:
 * - Desarrollo: npm run migrate:images
 * - Railway: node scripts/migrate-images-to-postgresql.js
 */

import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

// Configuración de migración
const MIGRATION_CONFIG = {
  // Directorio de imágenes públicas
  publicImagesDir: path.join(__dirname, '../public/images'),
  
  // Subdirectorios a procesar
  subdirectories: ['news', 'team'],
  
  // Tipos MIME soportados
  supportedMimeTypes: {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  },
  
  // Tamaño máximo (5MB)
  maxFileSize: 5 * 1024 * 1024,
  
  // Modo de ejecución
  dryRun: process.env.DRY_RUN === 'true',
  verbose: process.env.VERBOSE === 'true'
};

/**
 * Obtiene el tipo MIME basado en la extensión del archivo
 */
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIGRATION_CONFIG.supportedMimeTypes[ext] || null;
}

/**
 * Valida si un archivo es una imagen soportada
 */
async function validateImageFile(filePath) {
  try {
    const stats = await fs.stat(filePath);
    
    // Verificar tamaño
    if (stats.size > MIGRATION_CONFIG.maxFileSize) {
      return { valid: false, error: `Archivo muy grande: ${stats.size} bytes` };
    }
    
    // Verificar tipo MIME
    const mimeType = getMimeType(filePath);
    if (!mimeType) {
      return { valid: false, error: `Tipo de archivo no soportado: ${path.extname(filePath)}` };
    }
    
    return { valid: true, mimeType, size: stats.size };
  } catch (error) {
    return { valid: false, error: `Error accediendo archivo: ${error.message}` };
  }
}

/**
 * Lee un archivo de imagen y lo convierte a Buffer
 */
async function readImageAsBuffer(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    return buffer;
  } catch (error) {
    throw new Error(`Error leyendo archivo ${filePath}: ${error.message}`);
  }
}

/**
 * Busca archivos de imagen en un directorio
 */
async function findImageFiles(directory) {
  try {
    const files = await fs.readdir(directory);
    const imageFiles = [];
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = await fs.stat(filePath);
      
      if (stats.isFile()) {
        const mimeType = getMimeType(filePath);
        if (mimeType) {
          imageFiles.push({
            filename: file,
            fullPath: filePath,
            relativePath: path.relative(MIGRATION_CONFIG.publicImagesDir, filePath),
            mimeType,
            size: stats.size
          });
        }
      }
    }
    
    return imageFiles;
  } catch {
    console.warn(`⚠️  Directorio no encontrado: ${directory}`);
    return [];
  }
}

/**
 * Migra imágenes de noticias
 */
async function migrateNewsImages() {
  console.log('📰 Iniciando migración de imágenes de noticias...');
  
  const newsImagesDir = path.join(MIGRATION_CONFIG.publicImagesDir, 'news');
  const imageFiles = await findImageFiles(newsImagesDir);
  
  if (imageFiles.length === 0) {
    console.log('ℹ️  No se encontraron imágenes de noticias para migrar');
    return { processed: 0, errors: 0 };
  }
  
  console.log(`📁 Encontradas ${imageFiles.length} imágenes de noticias`);
  
  let processed = 0;
  let errors = 0;
  
  // Obtener todas las noticias existentes
  const allNews = await prisma.news.findMany({
    select: { id: true, title: true, slug: true, imageUrl: true }
  });
  
  for (const imageFile of imageFiles) {
    try {
      console.log(`🔄 Procesando: ${imageFile.filename}`);
      
      // Validar archivo
      const validation = await validateImageFile(imageFile.fullPath);
      if (!validation.valid) {
        console.error(`❌ Error validando ${imageFile.filename}: ${validation.error}`);
        errors++;
        continue;
      }
      
      // Leer archivo como buffer
      const imageBuffer = await readImageAsBuffer(imageFile.fullPath);
      
      // Buscar noticia que use esta imagen
      const publicPath = `/images/${imageFile.relativePath.replace(/\\/g, '/')}`;
      const matchingNews = allNews.find(news => 
        news.imageUrl === publicPath || 
        news.imageUrl?.includes(imageFile.filename)
      );
      
      if (matchingNews) {
        // Actualizar noticia existente
        if (!MIGRATION_CONFIG.dryRun) {
          await prisma.news.update({
            where: { id: matchingNews.id },
            data: {
              imageData: imageBuffer,
              imageType: validation.mimeType,
              imageUrl: `/api/images/${matchingNews.id}` // Nueva URL de API
            }
          });
        }
        
        console.log(`✅ Migrada: ${imageFile.filename} → Noticia: ${matchingNews.title}`);
        console.log(`   🔗 Nueva URL: /api/images/${matchingNews.id}`);
        processed++;
      } else {
        // Imagen sin noticia asociada
        console.log(`⚠️  Imagen huérfana: ${imageFile.filename} (no hay noticia asociada)`);
        
        if (MIGRATION_CONFIG.verbose) {
          console.log(`   💾 Guardando como imagen independiente...`);
          
          // Opcionalmente crear entrada independiente (comentado por seguridad)
          /*
          if (!MIGRATION_CONFIG.dryRun) {
            const newNews = await prisma.news.create({
              data: {
                title: `Imagen migrada: ${path.parse(imageFile.filename).name}`,
                slug: `migrated-image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                excerpt: 'Imagen migrada automáticamente desde /public/images',
                content: 'Esta imagen fue migrada automáticamente al sistema PostgreSQL.',
                author: 'Sistema de migración',
                category: 'migración',
                tags: '["migración", "automático"]',
                published: false,
                imageData: imageBuffer,
                imageType: validation.mimeType,
                imageUrl: `/api/images/${newNews.id}`
              }
            });
            console.log(`   ✅ Creada entrada: /api/images/${newNews.id}`);
          }
          */
        }
      }
      
    } catch (error) {
      console.error(`❌ Error procesando ${imageFile.filename}: ${error.message}`);
      errors++;
    }
  }
  
  return { processed, errors, total: imageFiles.length };
}

/**
 * Migra imágenes del equipo (para futuro uso)
 */
async function migrateTeamImages() {
  console.log('👥 Iniciando migración de imágenes del equipo...');
  
  const teamImagesDir = path.join(MIGRATION_CONFIG.publicImagesDir, 'team');
  const imageFiles = await findImageFiles(teamImagesDir);
  
  if (imageFiles.length === 0) {
    console.log('ℹ️  No se encontraron imágenes del equipo para migrar');
    return { processed: 0, errors: 0 };
  }
  
  console.log(`📁 Encontradas ${imageFiles.length} imágenes del equipo`);
  console.log('ℹ️  Migración de equipo no implementada en esta versión');
  
  // TODO: Implementar cuando el modelo TeamMember tenga campos imageData/imageType
  return { processed: 0, errors: 0, total: imageFiles.length };
}

/**
 * Función principal de migración
 */
async function runMigration() {
  console.log('🚀 INICIANDO MIGRACIÓN DE IMÁGENES A POSTGRESQL');
  console.log('================================================');
  console.log(`📅 Fecha: ${new Date().toISOString()}`);
  console.log(`🔧 Modo: ${MIGRATION_CONFIG.dryRun ? 'DRY RUN (no se guardarán cambios)' : 'PRODUCCIÓN'}`);
  console.log(`📁 Directorio: ${MIGRATION_CONFIG.publicImagesDir}`);
  console.log('');
  
  try {
    // Verificar conexión a base de datos
    console.log('🔌 Verificando conexión a PostgreSQL...');
    await prisma.$connect();
    console.log('✅ Conexión establecida');
    console.log('');
    
    const results = {
      news: { processed: 0, errors: 0, total: 0 },
      team: { processed: 0, errors: 0, total: 0 }
    };
    
    // Migrar imágenes de noticias
    results.news = await migrateNewsImages();
    console.log('');
    
    // Migrar imágenes del equipo
    results.team = await migrateTeamImages();
    console.log('');
    
    // Resumen final
    console.log('📊 RESUMEN DE MIGRACIÓN');
    console.log('========================');
    console.log(`📰 Noticias: ${results.news.processed}/${results.news.total} migradas, ${results.news.errors} errores`);
    console.log(`👥 Equipo: ${results.team.processed}/${results.team.total} migradas, ${results.team.errors} errores`);
    
    const totalProcessed = results.news.processed + results.team.processed;
    const totalErrors = results.news.errors + results.team.errors;
    const totalFiles = results.news.total + results.team.total;
    
    console.log('');
    console.log(`🎯 TOTAL: ${totalProcessed}/${totalFiles} archivos migrados exitosamente`);
    
    if (totalErrors > 0) {
      console.log(`⚠️  ${totalErrors} errores encontrados (revisar logs arriba)`);
    }
    
    if (MIGRATION_CONFIG.dryRun) {
      console.log('');
      console.log('🔍 MODO DRY RUN: No se realizaron cambios en la base de datos');
      console.log('   Para ejecutar la migración real, ejecuta: DRY_RUN=false npm run migrate:images');
    } else {
      console.log('');
      console.log('✅ MIGRACIÓN COMPLETADA');
      console.log('   Las imágenes ahora están almacenadas en PostgreSQL');
      console.log('   Las URLs han sido actualizadas a /api/images/[id]');
    }
    
  } catch (error) {
    console.error('💥 ERROR CRÍTICO EN LA MIGRACIÓN:');
    
    // Manejo específico de errores de conexión
    if (error.code === 'P1000' || error.message?.includes('Authentication failed')) {
      console.error('🔒 Error de autenticación PostgreSQL:');
      console.error('   - Verificar que DATABASE_URL esté configurada');
      console.error('   - Confirmar que la base de datos esté accesible');
      console.error('   - En desarrollo local, asegurar PostgreSQL ejecutándose');
      console.error('   - En Railway, verificar variables de entorno');
    } else if (error.code === 'ENOTFOUND' || error.message?.includes('connect')) {
      console.error('🌐 Error de conexión de red:');
      console.error('   - Verificar conectividad a la base de datos');
      console.error('   - Confirmar que el host PostgreSQL esté disponible');
    } else {
      console.error('⚠️  Error desconocido:');
      console.error(error);
    }
    
    console.error('');
    console.error('💡 SOLUCIONES RECOMENDADAS:');
    console.error('   1. Verificar variables de entorno DATABASE_URL');
    console.error('   2. Confirmar que PostgreSQL esté ejecutándose');
    console.error('   3. Ejecutar este script en Railway donde la BD está disponible');
    console.error('   4. Usar Railway CLI: railway run npm run migrate:images:dry');
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar migración si el script es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigration()
    .then(() => {
      console.log('');
      console.log('🏁 Migración finalizada');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Error fatal:', error);
      process.exit(1);
    });
}

export { runMigration, migrateNewsImages, migrateTeamImages };
