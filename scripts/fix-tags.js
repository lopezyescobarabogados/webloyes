const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixTagsFormat() {
  console.log('🔄 Corrigiendo formato de tags en noticias...');
  
  try {
    // Obtener todas las noticias
    const allNews = await prisma.news.findMany();
    
    console.log(`📰 Encontradas ${allNews.length} noticias para revisar`);
    
    let fixed = 0;
    
    for (const news of allNews) {
      let needsUpdate = false;
      let newTags = news.tags;
      
      // Si tags está vacío o es null, usar la categoría
      if (!news.tags || news.tags.trim() === '') {
        newTags = JSON.stringify([news.category || 'Sin categoría']);
        needsUpdate = true;
      } else {
        try {
          // Intentar parsear los tags existentes
          const parsed = JSON.parse(news.tags);
          
          // Si no es un array, convertirlo
          if (!Array.isArray(parsed)) {
            if (typeof parsed === 'string') {
              newTags = JSON.stringify([parsed]);
            } else {
              newTags = JSON.stringify([news.category || 'Sin categoría']);
            }
            needsUpdate = true;
          }
        } catch (error) {
          // Si falla el parsing, usar el string como un solo tag
          newTags = JSON.stringify([news.tags]);
          needsUpdate = true;
        }
      }
      
      if (needsUpdate) {
        await prisma.news.update({
          where: { id: news.id },
          data: { tags: newTags }
        });
        
        console.log(`✅ Corregida noticia: "${news.title}"`);
        console.log(`   Tags antes: ${news.tags}`);
        console.log(`   Tags después: ${newTags}`);
        fixed++;
      }
    }
    
    console.log(`\n🎉 Proceso completado!`);
    console.log(`📊 Total noticias revisadas: ${allNews.length}`);
    console.log(`🔧 Total noticias corregidas: ${fixed}`);
    
  } catch (error) {
    console.error('❌ Error durante la corrección:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar el script
fixTagsFormat();
