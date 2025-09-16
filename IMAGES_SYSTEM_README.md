# Sistema de Imágenes PostgreSQL - López y Escobar Abogados

## 🎯 Resumen del Problema Resuelto

**Problema Original:** Las imágenes se guardaban como archivos en el sistema de archivos local, pero Railway no preserva archivos entre despliegues, causando que las imágenes desaparecieran.

**Solución Implementada:** Sistema completo de almacenamiento de imágenes en PostgreSQL usando campos BYTEA, con API endpoints para servir las imágenes y componentes React optimizados para su visualización.

## 🏗️ Arquitectura del Sistema

### Base de Datos (PostgreSQL)
```sql
-- Campos añadidos al modelo News
ALTER TABLE "news" ADD COLUMN "imageData" BYTEA;
ALTER TABLE "news" ADD COLUMN "imageType" TEXT;

-- El campo imageUrl se mantiene para compatibilidad y URLs externas
```

### API Endpoints

#### 1. Subir Noticia con Imagen
- **Endpoint:** `POST /api/news`
- **Formato:** FormData con campos `title`, `content`, `summary`, `image`
- **Proceso:** Validación → Buffer → Transacción → Storage en BYTEA

#### 2. Actualizar Noticia
- **Endpoint:** `PUT /api/news/[id]`
- **Formato:** FormData (imagen opcional)
- **Funcionalidades:** Reemplazar imagen, eliminar imagen, mantener imagen actual

#### 3. Servir Imágenes
- **Endpoint:** `GET /api/images/[id]`
- **Formato:** Stream binario con headers de cache
- **Proceso:** Query SQL → Buffer → Response Stream

### Componentes Frontend

#### ApiImage
Componente base para imágenes servidas desde PostgreSQL:
```tsx
<ApiImage
  src="/api/images/123"
  alt="Descripción"
  width={400}
  height={300}
  fallbackText="Sin imagen"
/>
```

#### NewsImage
Variante con tamaños predefinidos:
```tsx
<NewsImage
  src="/api/images/123"
  alt="Noticia"
  size="lg" // sm, md, lg, xl
/>
```

#### SmartNewsImage
Componente inteligente con validación automática:
```tsx
<SmartNewsImage
  news={{ id: "123", title: "Título", imageUrl: "/api/images/123" }}
  size="md"
  priority={true}
/>
```

## 📁 Estructura de Archivos

```
src/
├── app/api/
│   ├── images/[id]/route.ts     # Servir imágenes desde PostgreSQL
│   ├── news/route.ts            # Crear noticias con imágenes
│   └── news/[id]/route.ts       # Actualizar/eliminar noticias
├── components/
│   ├── ui/OptimizedImage.tsx    # Componentes base ApiImage/NewsImage
│   └── news/SmartNewsImage.tsx  # Componente inteligente
├── hooks/
│   └── useNewsImage.ts          # Hook para gestión de imágenes
├── utils/
│   ├── news-upload.ts           # Utilidades para upload
│   └── image-validation.ts      # Validaciones de imágenes
└── prisma/
    └── schema.prisma            # Schema con campos BYTEA
```

## 🚀 Guía de Implementación

### Paso 1: Aplicar Migración SQL
```sql
-- Ejecutar en Railway PostgreSQL
ALTER TABLE "news" ADD COLUMN "imageData" BYTEA;
ALTER TABLE "news" ADD COLUMN "imageType" TEXT;
```

### Paso 2: Actualizar Componentes Existentes
Reemplazar imports de imágenes tradicionales:
```tsx
// Antes
<Image src={news.imageUrl} alt={news.title} width={400} height={300} />

// Después
<SmartNewsImage news={news} size="md" />
```

### Paso 3: Actualizar Formularios de Admin
Los formularios ya están preparados en:
- `src/components/admin/NewsUploadForm.tsx`
- `src/components/admin/NewsEditForm.tsx`

### Paso 4: Testing
Acceder a `/demo/image-system` para probar todos los componentes.

## 📋 Funcionalidades Implementadas

### ✅ Almacenamiento
- [x] Campos BYTEA en PostgreSQL
- [x] Validación de tipos MIME (JPEG, PNG, WebP, GIF)
- [x] Límite de tamaño (5MB)
- [x] Compresión automática opcional

### ✅ API Endpoints
- [x] Upload con FormData
- [x] Serving con headers de cache
- [x] Validación de seguridad
- [x] Manejo de errores robusto
- [x] Soporte HEAD requests

### ✅ Componentes React
- [x] ApiImage base
- [x] NewsImage con tamaños predefinidos
- [x] SmartNewsImage inteligente
- [x] Hook useNewsImage
- [x] Estados de carga y error
- [x] Fallbacks automáticos

### ✅ Optimizaciones
- [x] Cache headers (1 año)
- [x] Lazy loading
- [x] Priority loading para imágenes críticas
- [x] Preload utilities
- [x] Responsive design

## 🛠️ Comandos de Desarrollo

### Instalar Dependencias
```bash
npm install
```

### Desarrollo Local
```bash
npm run dev
```

### Aplicar Migraciones
```bash
# En Railway, conectar a PostgreSQL y ejecutar:
# ALTER TABLE "news" ADD COLUMN "imageData" BYTEA;
# ALTER TABLE "news" ADD COLUMN "imageType" TEXT;
```

### Testing de Componentes
```bash
# Acceder a http://localhost:3000/demo/image-system
```

## 🔒 Seguridad

### Validaciones Implementadas
- **Tipos MIME:** Solo imágenes permitidas
- **Tamaño:** Máximo 5MB por imagen
- **Headers:** Validación Content-Type
- **SQL Injection:** Queries parametrizadas
- **XSS:** Sanitización automática

### Headers de Seguridad
```typescript
// Headers aplicados en /api/images/[id]
'Cache-Control': 'public, max-age=31536000, immutable'
'Content-Type': imageType (validado)
'Content-Security-Policy': "default-src 'self'"
```

## 📊 Métricas y Monitoreo

### Logs Disponibles
- Upload success/error
- Image serving requests
- Validation failures
- Performance metrics

### Debugging
```typescript
// Verificar imagen existe
fetch('/api/images/123', { method: 'HEAD' })

// Obtener info de imagen
const response = await fetch('/api/images/123')
console.log(response.headers.get('content-type'))
```

## 🔄 Migración desde Sistema Anterior

### Para Imágenes Existentes
1. Las imágenes con `imageUrl` externa seguirán funcionando
2. Nuevas imágenes se almacenarán en PostgreSQL
3. El campo `imageUrl` se usará para referencias externas
4. SmartNewsImage maneja ambos casos automáticamente

### Compatibilidad
- ✅ URLs externas (http/https)
- ✅ URLs de API (/api/images/[id])
- ✅ Fallbacks automáticos
- ✅ Migración gradual sin downtime

## 🎯 Beneficios del Sistema

1. **Persistencia:** Las imágenes nunca se pierden entre despliegues
2. **Performance:** Cache optimizado y lazy loading
3. **Escalabilidad:** PostgreSQL maneja millones de imágenes
4. **Simplicidad:** Un solo lugar para todas las imágenes
5. **Seguridad:** Validación y sanitización completa
6. **Flexibilidad:** Soporte para URLs externas e internas

## 📞 Soporte

Para problemas o mejoras:
1. Verificar logs en Railway
2. Probar endpoints en `/demo/image-system`
3. Revisar validaciones de TypeScript
4. Comprobar migraciones SQL aplicadas

---

**Sistema implementado y listo para producción** ✅

Las imágenes ahora se almacenan permanentemente en PostgreSQL y están disponibles inmediatamente después del despliegue en Railway.
