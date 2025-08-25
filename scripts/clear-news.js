const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearNewsDatabase() {
  console.log('🔍 Verificando noticias existentes...');
  
  try {
    // Obtener todas las noticias
    const allNews = await prisma.news.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true
      }
    });
    
    console.log(`📰 Total de noticias encontradas: ${allNews.length}`);
    
    if (allNews.length === 0) {
      console.log('✅ La base de datos ya está vacía.');
      return;
    }
    
    // Mostrar todas las noticias que se van a eliminar
    console.log('\n📋 Noticias que serán eliminadas:');
    allNews.forEach((news, index) => {
      console.log(`${index + 1}. "${news.title}" (ID: ${news.id})`);
    });
    
    console.log('\n⚠️  ADVERTENCIA: Esta acción eliminará TODAS las noticias permanentemente.');
    console.log('🔄 Procediendo con la eliminación...');
    
    // Eliminar todas las noticias
    const deleteResult = await prisma.news.deleteMany({});
    
    console.log(`\n✅ Eliminación completada exitosamente!`);
    console.log(`🗑️  Total de noticias eliminadas: ${deleteResult.count}`);
    console.log('📰 La base de datos de noticias está ahora vacía y lista para nuevas noticias.');
    
    // Verificar que la eliminación fue exitosa
    const remainingNews = await prisma.news.count();
    console.log(`\n🔍 Verificación: ${remainingNews} noticias restantes en la base de datos.`);
    
    if (remainingNews === 0) {
      console.log('✅ Verificación exitosa: Base de datos completamente limpia.');
    } else {
      console.log('⚠️  Advertencia: Aún quedan algunas noticias en la base de datos.');
    }
    
  } catch (error) {
    console.error('❌ Error durante la eliminación:', error);
    console.log('🛡️  No se realizaron cambios en la base de datos.');
  } finally {
    await prisma.$disconnect();
    console.log('\n🔌 Conexión a la base de datos cerrada.');
  }
}

// Ejecutar el script
clearNewsDatabase();
