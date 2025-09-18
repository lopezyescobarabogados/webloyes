/**
 * Script de verificación completa del sistema de imágenes
 * Verifica URLs, debug logs y funcionamiento end-to-end
 */

const BASE_URL = 'https://www.lopezyescobarabogados.com';

async function verifyImageSystem() {
  console.log('🔍 Verificando sistema de imágenes en producción...\n');

  try {
    // 1. Verificar API de noticias
    console.log('📡 1. Verificando API de noticias...');
    const newsResponse = await fetch(`${BASE_URL}/api/news`);
    
    if (!newsResponse.ok) {
      throw new Error(`API Error: ${newsResponse.status} ${newsResponse.statusText}`);
    }
    
    const news = await newsResponse.json();
    console.log(`✅ API responde correctamente. Encontradas ${news.length} noticias`);
    
    // 2. Analizar estructura de imágenes
    console.log('\n🖼️ 2. Analizando estructura de imágenes...');
    const imageStats = {
      withImageUrl: 0,
      withImageData: 0,
      apiUrls: 0,
      externalUrls: 0
    };
    
    news.forEach((item, index) => {
      if (item.imageUrl) {
        imageStats.withImageUrl++;
        if (item.imageUrl.includes('/api/images/')) {
          imageStats.apiUrls++;
        } else {
          imageStats.externalUrls++;
        }
      }
      if (item.imageData) {
        imageStats.withImageData++;
      }
      
      if (index < 3) {
        console.log(`Noticia ${index + 1}:`);
        console.log(`  Título: ${item.title?.substring(0, 50)}...`);
        console.log(`  imageUrl: ${item.imageUrl || 'null'}`);
        console.log(`  imageData: ${item.imageData ? 'presente' : 'null'}`);
        console.log(`  imageType: ${item.imageType || 'null'}`);
        console.log('');
      }
    });
    
    console.log('📊 Estadísticas de imágenes:');
    console.log(`  Con imageUrl: ${imageStats.withImageUrl}/${news.length}`);
    console.log(`  Con imageData: ${imageStats.withImageData}/${news.length}`);
    console.log(`  URLs API internas: ${imageStats.apiUrls}`);
    console.log(`  URLs externas: ${imageStats.externalUrls}`);
    
    // 3. Verificar URLs de imagen específicas
    console.log('\n🌐 3. Verificando URLs de imagen...');
    const testUrls = news.slice(0, 3)
      .map(item => item.imageUrl)
      .filter(Boolean)
      .map(url => url.startsWith('/') ? `${BASE_URL}${url}` : url); // Convertir relativas a absolutas
    
    for (const url of testUrls) {
      console.log(`Probando: ${url}`);
      try {
        const response = await fetch(url, { method: 'HEAD' });
        console.log(`  Status: ${response.status} ${response.statusText}`);
        console.log(`  Content-Type: ${response.headers.get('content-type')}`);
        console.log(`  Content-Length: ${response.headers.get('content-length')}`);
        
        if (!response.ok) {
          console.log(`  ⚠️ Error: URL no accesible`);
        } else {
          console.log(`  ✅ URL funcional`);
        }
      } catch (error) {
        console.log(`  ❌ Error: ${error.message}`);
      }
      console.log('');
    }
    
    // 4. Verificar página de noticias
    console.log('📄 4. Verificando página de noticias...');
    try {
      const pageResponse = await fetch(`${BASE_URL}/noticias`);
      if (pageResponse.ok) {
        const html = await pageResponse.text();
        const imgTags = html.match(/<img[^>]*src="[^"]*api\/images[^"]*"[^>]*>/g) || [];
        console.log(`✅ Página carga correctamente`);
        console.log(`🖼️ Encontradas ${imgTags.length} imágenes de API en HTML`);
        
        if (imgTags.length > 0) {
          console.log('Ejemplos de tags img encontrados:');
          imgTags.slice(0, 2).forEach((tag, index) => {
            console.log(`  ${index + 1}. ${tag.substring(0, 100)}...`);
          });
        }
      } else {
        console.log(`❌ Error cargando página: ${pageResponse.status}`);
      }
    } catch (error) {
      console.log(`❌ Error verificando página: ${error.message}`);
    }
    
    console.log('\n🎯 Resumen de verificación completado.');
    
  } catch (error) {
    console.error('❌ Error en verificación:', error.message);
  }
}

// Ejecutar verificación
verifyImageSystem().catch(console.error);
