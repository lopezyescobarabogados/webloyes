/**
 * Script para probar el flujo completo de imágenes
 * Simula subir una imagen desde el admin
 */

async function testImageUpload() {
  console.log('🧪 Probando flujo de subida de imágenes...\n');

  // Crear un archivo de prueba simple
  const testImageData = new Uint8Array([
    137, 80, 78, 71, 13, 10, 26, 10, // PNG signature
    0, 0, 0, 13, 73, 72, 68, 82,     // IHDR chunk
    0, 0, 0, 1, 0, 0, 0, 1, 8, 6,   // 1x1 pixel, RGBA
    0, 0, 0, 31, 21, 196, 137        // CRC
  ]);

  const blob = new Blob([testImageData], { type: 'image/png' });
  const file = new File([blob], 'test-image.png', { type: 'image/png' });

  // Crear FormData como lo haría el admin
  const formData = new FormData();
  formData.append('title', 'Prueba de imagen desde script');
  formData.append('content', 'Contenido de prueba para verificar que las imágenes se suben correctamente.');
  formData.append('excerpt', 'Excerpt de prueba');
  formData.append('author', 'Script de Prueba');
  formData.append('category', 'Derecho Civil');
  formData.append('tags', '["test", "imagen"]');
  formData.append('published', 'true');
  formData.append('featured', 'false');
  formData.append('image', file);

  try {
    console.log('📤 Enviando noticia con imagen...');
    const response = await fetch('https://www.lopezyescobarabogados.com/api/news', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Noticia creada exitosamente:');
      console.log(`   ID: ${result.id}`);
      console.log(`   Título: ${result.title}`);
      console.log(`   imageUrl: ${result.imageUrl}`);
      
      // Verificar que la imagen se puede acceder
      if (result.imageUrl) {
        console.log('\n🔍 Verificando acceso a la imagen...');
        const imageUrl = result.imageUrl.startsWith('/') 
          ? `https://www.lopezyescobarabogados.com${result.imageUrl}`
          : result.imageUrl;
        
        const imageResponse = await fetch(imageUrl, { method: 'HEAD' });
        if (imageResponse.ok) {
          console.log(`✅ Imagen accesible: ${imageResponse.status} ${imageResponse.statusText}`);
          console.log(`   Content-Type: ${imageResponse.headers.get('content-type')}`);
          console.log(`   Content-Length: ${imageResponse.headers.get('content-length')}`);
        } else {
          console.log(`❌ Error accediendo a imagen: ${imageResponse.status}`);
        }
      }

      // Verificar en la API de noticias
      console.log('\n📋 Verificando en lista de noticias...');
      const newsResponse = await fetch('https://www.lopezyescobarabogados.com/api/news');
      if (newsResponse.ok) {
        const allNews = await newsResponse.json();
        const createdNews = allNews.find(n => n.id === result.id);
        if (createdNews) {
          console.log('✅ Noticia encontrada en lista:');
          console.log(`   imageUrl: ${createdNews.imageUrl}`);
          console.log(`   imageData: ${createdNews.imageData ? 'presente' : 'ausente'}`);
          console.log(`   imageType: ${createdNews.imageType || 'null'}`);
        }
      }

    } else {
      const error = await response.text();
      console.log(`❌ Error creando noticia: ${response.status}`);
      console.log(`   Error: ${error}`);
    }

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  }
}

// Ejecutar la prueba
testImageUpload().catch(console.error);
