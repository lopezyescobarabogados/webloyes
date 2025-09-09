# 🚀 Deploy Guide - López y Escobar Abogados

## ✅ Configuración Optimizada para Railway

### 📋 Archivos de Configuración

- **`nixpacks.toml`**: Controla el proceso de build en Railway
- **`railway.json`**: Configuración específica de Railway
- **`package-lock.json`**: Lockfile para instalación determinística con npm ci
- **`scripts/start-production.sh`**: Script de inicio con migraciones automáticas

### 🔄 Proceso de Deploy Automático

1. **Install**: `npm ci --omit=dev --prefer-offline --no-audit --no-fund --legacy-peer-deps`
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
- `DATABASE_URL`: URL de PostgreSQL (auto-generada)
- `NODE_ENV`: production
- `PORT`: AUTO (Railway lo asigna automáticamente)
- `ADMIN_KEY`: clave_admin_muy_segura_minimo_8_caracteres (CRÍTICO)

⚠️ **IMPORTANTE**: Sin `ADMIN_KEY` el panel `/admin` no funcionará

### 🏥 Health Check

- **Endpoint**: `/api/health`
- **Verifica**: Conexión a base de datos y estado del servidor

### 🚨 Solución Implementada

✅ **Error EBUSY**: Configuración Nixpacks evita conflicto npm i/npm ci
✅ **Error EUSAGE**: package-lock.json generado y versionado
✅ **Error Prisma Query Engine**: Binary targets y script post-build
✅ **Migraciones automáticas**: Script robusto con reintentos
✅ **Build determinístico**: npm ci con lockfile garantiza reproducibilidad

### 🔧 Solución Prisma Query Engine

El error "Prisma Client could not locate the Query Engine for runtime debian-openssl-3.0.x" se resolvió con:

1. **Binary Targets en schema.prisma**:
   ```prisma
   generator client {
     provider      = "prisma-client-js"
     binaryTargets = ["native", "debian-openssl-3.0.x"]
   }
   ```

2. **Script post-build**: Copia automáticamente los binarios al standalone
3. **Instalación completa**: Se instalan todas las dependencias para build, luego se hace prune

### 🔍 Troubleshooting

Si el deploy falla:
1. Verificar que `package-lock.json` esté en el repo
2. Verificar variables `DATABASE_URL` en Railway
3. Revisar logs en Railway dashboard
4. Health check: `GET /api/health`

## 📝 Notas para Desarrolladores

- ✅ `package-lock.json` DEBE estar versionado en git
- ✅ Railway usa las variables de entorno del dashboard
- ✅ Las migraciones se aplican automáticamente en cada deploy
- ✅ El servidor usa modo standalone para mejor rendimiento
- ✅ `--legacy-peer-deps` resuelve conflictos de peer dependencies

## 🚨 Troubleshooting - Error "1/1 replicas never became healthy"

### ✅ Soluciones Implementadas:

1. **Script de inicio mejorado** (`scripts/start-production.sh`):
   - ✅ 5 reintentos para migraciones con delays de 10s
   - ✅ Detección automática del PORT de Railway
   - ✅ Verificaciones de archivos antes de inicio
   - ✅ Logging detallado para debugging

2. **Healthcheck optimizado** (`railway.json`):
   - ✅ Timeout extendido a 300 segundos
   - ✅ Máximo 10 reintentos con política ON_FAILURE
   - ✅ Endpoint `/api/health` que verifica DB

3. **Variables críticas**:
   - ✅ `DATABASE_URL`: Auto-generada por Railway
   - ✅ `PORT`: Auto-asignada por Railway
   - ✅ `ADMIN_KEY`: DEBE configurarse manualmente
   - ✅ `NODE_ENV=production`

### 🔍 Si el deploy aún falla:

1. **Verificar logs en Railway Dashboard**
2. **Confirmar que PostgreSQL addon está conectado**
3. **Verificar que ADMIN_KEY esté configurada**
4. **Esperar hasta 5 minutos para migraciones lentas**
