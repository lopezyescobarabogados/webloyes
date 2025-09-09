# 🚀 Deploy Guide - López y Escobar Abogados

## ✅ Configuración Optimizada para Railway

### 📋 Archivos de Configuración

- **`nixpacks.toml`**: Controla el proceso de build en Railway
- **`railway.json`**: Configuración específica de Railway
- **`scripts/start-production.sh`**: Script de inicio con migraciones automáticas

### 🔄 Proceso de Deploy Automático

1. **Install**: `npm ci --omit=dev --prefer-offline --no-audit --no-fund`
2. **Build**: 
   - `npx prisma generate`
   - `npm run build`
3. **Start**: `./scripts/start-production.sh`
   - Ejecuta migraciones automáticamente
   - Inicia servidor standalone

### 🗄️ Base de Datos

- ✅ Migraciones en `prisma/migrations/20250908000000_init/`
- ✅ Schema definido en `prisma/schema.prisma`
- ✅ Auto-aplicación de migraciones en cada deploy

### 🔧 Variables de Entorno Requeridas

En Railway configura:
- `DATABASE_URL`: URL de PostgreSQL
- `NODE_ENV`: production

### 🏥 Health Check

- **Endpoint**: `/api/health`
- **Verifica**: Conexión a base de datos y estado del servidor

### 🚨 Solución a Error EBUSY

La configuración en `nixpacks.toml` evita el conflicto entre `npm i` y `npm ci` que causaba:
```
npm error EBUSY: resource busy or locked, rmdir '/app/node_modules/.cache'
```

## 📝 Notas para Desarrolladores

- El archivo `.env.local` es solo para desarrollo local
- Railway usa las variables de entorno configuradas en el dashboard
- Las migraciones se aplican automáticamente en cada deploy
- El servidor usa modo standalone para mejor rendimiento
