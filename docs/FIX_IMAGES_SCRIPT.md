# Script de Migración de URLs de Imágenes

## 🎯 Propósito

Este script migra noticias existentes que tienen URLs de filesystem local (como `/images/news/archivo.jpg`) y las convierte para usar el sistema de API PostgreSQL (`/api/images/:id`).

## 🔧 Uso

### En Railway (Producción)
```bash
# Modo dry-run (solo análisis, no cambios)
railway run npm run fix:images:dry

# Aplicar migración real
railway run npm run fix:images
```

### En Desarrollo Local
```bash
# Modo dry-run (requiere configuración de DB)
npm run fix:images:dry

# Aplicar migración (requiere configuración de DB)
npm run fix:images
```

## 📋 Qué hace el script

### 1. **Detección de URLs Problemáticas**
Busca noticias con patrones como:
- `/images/news/archivo.jpg`
- `/public/images/archivo.png`  
- `./images/archivo.gif`
- `../images/archivo.webp`

### 2. **Análisis de Datos**
- Cuenta noticias por patrón de URL
- Identifica cuáles tienen `imageData` en PostgreSQL
- Muestra ejemplos de URLs problemáticas

### 3. **Migración Inteligente**
- Solo migra noticias que tienen `imageData` en PostgreSQL
- Omite noticias sin datos binarios (evita URLs rotas)
- Convierte URLs a `/api/images/:id` 

### 4. **Validación Post-Migración**
- Verifica que no queden URLs problemáticas
- Cuenta URLs de API creadas
- Muestra ejemplos de URLs migradas

## 📊 Ejemplo de Output

```
🔧 SCRIPT DE MIGRACIÓN DE IMÁGENES
============================================================
📅 Fecha: 2025-09-16T21:34:14.126Z
🎯 Modo: DRY-RUN

🔍 Buscando noticias con URLs problemáticas...
📋 Encontradas 5 noticias con URLs problemáticas

📊 ANÁLISIS DE NOTICIAS PROBLEMÁTICAS:
============================================================
📂 Por patrón de URL:
   /images/news/: 5 noticias

💾 Por disponibilidad de datos:
   Con imageData en PostgreSQL: 3
   Sin imageData (solo URL): 2

📝 Ejemplos de URLs problemáticas:
   1. Nueva ley sobre derecho corporativo...
      URL: /images/news/1758051210263-WhatsApp_Image.png
      Estado: ✅ Con datos

🔄 INICIANDO MIGRACIÓN:
============================================================
⚠️  MODO DRY-RUN: No se aplicarán cambios reales

📦 Procesando lote 1/1 (5 noticias):
   [DRY-RUN] news-123: /images/news/archivo.jpg → /api/images/news-123
   ⏭️  news-456: Omitido (sin imageData en PostgreSQL)

📊 REPORTE FINAL:
============================================================
📋 Total encontradas: 5
✅ Migradas exitosamente: 3
⏭️  Omitidas (sin datos): 2
❌ Errores: 0
📈 Tasa de éxito: 60%

💡 PRÓXIMOS PASOS:
   1. Revisar el análisis anterior
   2. Ejecutar sin --dry-run para aplicar cambios:
      railway run npm run fix:images
```

## 🚀 Flujo Recomendado

### 1. **Análisis Inicial**
```bash
railway run npm run fix:images:dry
```
- Revisa qué noticias necesitan migración
- Verifica que tengan datos en PostgreSQL
- Confirma los cambios propuestos

### 2. **Ejecutar Migración**
```bash
railway run npm run fix:images
```
- Aplica los cambios reales
- Solo migra noticias con `imageData`
- Valida resultados automáticamente

### 3. **Verificación Post-Migración**
```bash
railway run npm run diagnose:images
```
- Confirma que no quedan URLs problemáticas
- Verifica el estado general del sistema

## 🔒 Características de Seguridad

- **Modo dry-run por defecto**: Previene cambios accidentales
- **Validación de datos**: Solo migra noticias con `imageData` válido
- **Procesamiento en lotes**: Evita sobrecargar la base de datos
- **Error handling robusto**: Continúa procesando aunque haya errores individuales
- **Logs detallados**: Permite debugging de problemas

## ⚠️ Consideraciones Importantes

1. **Solo para noticias con datos**: El script omite noticias sin `imageData` en PostgreSQL para evitar URLs rotas

2. **Irreversible**: Una vez migradas, las URLs originales se pierden (pero están en logs)

3. **Railway requerido**: Para datos de producción, debe ejecutarse en Railway con acceso a PostgreSQL

4. **Backup recomendado**: Aunque el script es seguro, considera hacer backup de la DB antes de migración masiva

## 🎯 Resultado Final

Después de la migración exitosa:
- ✅ Todas las noticias usan URLs de API: `/api/images/:id`
- ✅ Las imágenes se sirven desde PostgreSQL
- ✅ Compatible con el sistema de componentes React
- ✅ Funciona perfectamente en Railway

## 💡 Troubleshooting

### Error de autenticación
```
Authentication failed against database server
```
**Solución**: Ejecutar en Railway con `railway run npm run fix:images`

### URLs no migradas
Si quedan URLs problemáticas después de la migración, probablemente no tienen `imageData` en PostgreSQL. Usar el script de migración de archivos físicos primero:
```bash
railway run npm run migrate:images
```
