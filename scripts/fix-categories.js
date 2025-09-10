// Script para limpiar datos inconsistentes de categorías en la base de datos
// Ejecutar con: node scripts/fix-categories.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixCategories() {
  console.log('🔧 Iniciando limpieza de categorías...');
  
  try {
    // Obtener todas las noticias
    const allNews = await prisma.news.findMany();
    console.log(`📊 Encontradas ${allNews.length} noticias para revisar`);
    
    let fixedCount = 0;
    
    for (const news of allNews) {
      let needsUpdate = false;
      let newCategory = news.category;
      
      // Verificar si la categoría parece ser un JSON array
      if (typeof news.category === 'string' && news.category.startsWith('[')) {
        try {
          const parsed = JSON.parse(news.category);
          if (Array.isArray(parsed) && parsed.length > 0) {
            newCategory = parsed[0];
            needsUpdate = true;
            console.log(`📝 Noticia "${news.title}": ${news.category} → ${newCategory}`);
          }
        } catch {
          console.log(`⚠️  Error parsing category for "${news.title}": ${news.category}`);
        }
      }
      
      if (needsUpdate) {
        await prisma.news.update({
          where: { id: news.id },
          data: { category: newCategory }
        });
        fixedCount++;
      }
    }
    
    console.log(`✅ Proceso completado. ${fixedCount} categorías fueron corregidas.`);
    
  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixCategories();
