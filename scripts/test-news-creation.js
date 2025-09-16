#!/usr/bin/env node

/**
 * Script de prueba para el endpoint de creación de noticias
 * Prueba tanto JSON como FormData
 */

const BACKEND_URL = 'http://localhost:3002';

async function testJsonEndpoint() {
  console.log('🧪 Probando endpoint con JSON...');
  
  const testData = {
    title: 'Prueba JSON - ' + new Date().toISOString(),
    content: 'Contenido de prueba creado con JSON',
    excerpt: 'Resumen de prueba',
    author: 'López y Escobar Abogados',
    category: 'Derecho Civil',
    tags: '["test", "json"]',
    published: true,
    featured: false
  };

  try {
    const response = await fetch(`${BACKEND_URL}/api/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ JSON test successful:', result.title);
      return result;
    } else {
      const error = await response.text();
      console.log('❌ JSON test failed:', response.status, error);
    }
  } catch (error) {
    console.error('❌ JSON test error:', error.message);
  }
}

async function testFormDataEndpoint() {
  console.log('🧪 Probando endpoint con FormData...');
  
  const formData = new FormData();
  formData.append('title', 'Prueba FormData - ' + new Date().toISOString());
  formData.append('content', 'Contenido de prueba creado con FormData');
  formData.append('excerpt', 'Resumen de prueba FormData');
  formData.append('author', 'López y Escobar Abogados');
  formData.append('category', 'Derecho Comercial');
  formData.append('tags', '["test", "formdata"]');
  formData.append('published', 'true');
  formData.append('featured', 'false');

  try {
    const response = await fetch(`${BACKEND_URL}/api/news`, {
      method: 'POST',
      body: formData, // Sin Content-Type para FormData
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ FormData test successful:', result.title);
      return result;
    } else {
      const error = await response.text();
      console.log('❌ FormData test failed:', response.status, error);
    }
  } catch (error) {
    console.error('❌ FormData test error:', error.message);
  }
}

async function main() {
  console.log('🚀 Iniciando pruebas del endpoint /api/news\n');
  
  await testJsonEndpoint();
  console.log('');
  await testFormDataEndpoint();
  console.log('\n✨ Pruebas completadas');
}

if (require.main === module) {
  main().catch(console.error);
}
