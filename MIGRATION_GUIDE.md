# Guía de Migración de Imágenes a PostgreSQL

## 🎯 Objetivo
Migrar imágenes existentes desde `/public/images` hacia PostgreSQL BYTEA, actualizando las referencias en la base de datos para usar la nueva API `/api/images/[id]`.

## 📋 Prerrequisitos

### ✅ Verificaciones antes de la migración:
1. **Base de datos actualizada** con los nuevos campos:
   ```sql
   ALTER TABLE "news" ADD COLUMN "imageData" BYTEA;
   ALTER TABLE "news" ADD COLUMN "imageType" TEXT;
   ```

2. **Deploy exitoso** del nuevo sistema de imágenes PostgreSQL

3. **Backup de la base de datos** (recomendado para producción)

## 🚀 Métodos de Ejecución

### 1. Migración Local (Desarrollo)

```bash
# Modo dry-run (solo simula, no hace cambios)
npm run migrate:images:dry

# Migración con logs detallados
npm run migrate:images:verbose

# Migración real
npm run migrate:images
```

### 2. Migración en Railway (Producción)

#### Opción A: Railway CLI (Recomendada)
```bash
# Conectar a tu proyecto Railway
railway login
railway link

# Ejecutar migración directamente en Railway
railway run npm run migrate:images:dry
railway run npm run migrate:images
```

#### Opción B: Despliegue temporal
```bash
# 1. Crear branch de migración
git checkout -b migration/images-to-postgresql

# 2. Añadir comando temporal al package.json
# En "scripts", añadir:
# "migrate:on-start": "node scripts/migrate-images-to-postgresql.js && next start"

# 3. Temporalmente cambiar start en Railway a:
# "start": "npm run migrate:on-start"

# 4. Deploy y revertir cambios después
```

#### Opción C: Railway Shell
```bash
# Acceder al contenedor Railway
railway shell

# Ejecutar migración dentro del contenedor
node scripts/migrate-images-to-postgresql.js
```

## 📊 Comportamiento del Script

### 🔍 Proceso de migración:
1. **Escaneo:** Busca archivos en `/public/images/news/` y `/public/images/team/`
2. **Validación:** Verifica tipos MIME y tamaños (máx 5MB)
3. **Conversión:** Lee archivos como Buffer binario
4. **Matching:** Encuentra noticias que usen cada imagen
5. **Actualización:** Guarda en `imageData`/`imageType` y actualiza `imageUrl`

### 📁 Archivos soportados:
- `.jpg`, `.jpeg` → `image/jpeg`
- `.png` → `image/png`
- `.webp` → `image/webp`
- `.gif` → `image/gif`
- `.svg` → `image/svg+xml`

### 🔄 Actualización de URLs:
```
Antes: imageUrl = "/images/news/mi-imagen.jpg"
Después: imageUrl = "/api/images/cuid-de-la-noticia"
```

## ⚠️ Consideraciones Importantes

### 🛡️ Seguridad:
- **Dry-run primero:** Siempre ejecuta con `DRY_RUN=true` para verificar
- **Backup:** Haz backup de PostgreSQL antes de migración en producción
- **Rollback:** Ten plan de rollback si algo falla

### 📈 Performance:
- **Batches pequeños:** El script procesa archivos secuencialmente
- **Railway timeout:** Para muchas imágenes, considera múltiples ejecuciones
- **Monitoring:** Vigila uso de memoria durante la migración

### 🔧 Troubleshooting:

#### Error: "Directorio no encontrado"
```bash
# Verificar estructura de directorios
ls -la public/images/

# El script buscará:
# public/images/news/
# public/images/team/
```

#### Error: "Archivo muy grande"
```javascript
// Configurar límite en el script si necesario
const MIGRATION_CONFIG = {
  maxFileSize: 10 * 1024 * 1024 // 10MB en lugar de 5MB
};
```

#### Error: "Conexión PostgreSQL"
```bash
# Verificar variables de entorno en Railway:
# DATABASE_URL debe estar configurada
railway variables
```

## 📝 Logs y Monitoreo

### 📊 Output esperado:
```
🚀 INICIANDO MIGRACIÓN DE IMÁGENES A POSTGRESQL
🔌 Verificando conexión a PostgreSQL...
✅ Conexión establecida

📰 Iniciando migración de imágenes de noticias...
📁 Encontradas 5 imágenes de noticias
🔄 Procesando: hero-image.jpg
✅ Migrada: hero-image.jpg → Noticia: Nuevo servicio legal
   🔗 Nueva URL: /api/images/clm2x8k0001...

📊 RESUMEN DE MIGRACIÓN
📰 Noticias: 5/5 migradas, 0 errores
🎯 TOTAL: 5/5 archivos migrados exitosamente
✅ MIGRACIÓN COMPLETADA
```

## 🎯 Post-Migración

### ✅ Verificaciones:
1. **Test API endpoints:** `GET /api/images/[id]` funciona
2. **Verificar imágenes:** Se muestran correctamente en el sitio
3. **Check database:** Campos `imageData` e `imageType` poblados
4. **Performance:** Tiempo de carga de imágenes aceptable

### 🧹 Limpieza (Opcional):
```bash
# Después de confirmar que todo funciona:
# rm -rf public/images/news/*.jpg public/images/news/*.png
# (Mantener placeholders .svg)
```

## 🚨 Plan de Rollback

Si algo falla durante la migración:

### 1. Rollback de URLs:
```sql
-- Revertir URLs a rutas públicas originales
UPDATE news SET 
  imageUrl = '/images/news/' || (
    SELECT filename FROM original_images 
    WHERE news_id = news.id
  )
WHERE imageUrl LIKE '/api/images/%';
```

### 2. Rollback completo:
```sql
-- Limpiar campos binarios
UPDATE news SET 
  imageData = NULL,
  imageType = NULL
WHERE imageData IS NOT NULL;
```

### 3. Restaurar backup:
```bash
# Restaurar desde backup PostgreSQL
railway pg:restore backup-file.sql
```

## 📞 Soporte

Para problemas durante la migración:
1. **Revisar logs** del script para errores específicos
2. **Verificar Railway logs** para timeout o memoria
3. **Ejecutar en modo verbose** para debug detallado
4. **Rollback** si es necesario y contactar soporte

---

**¡La migración transferirá permanentemente las imágenes a PostgreSQL, garantizando persistencia en Railway!** 🚀
