# 🚀 Guía de Despliegue en Railway

## 📋 Pre-requisitos

1. Cuenta en [Railway](https://railway.app/)
2. Repositorio en GitHub con el código del proyecto
3. Variables de entorno configuradas

## 🔧 Configuración de Variables de Entorno en Railway

### Variables Requeridas

Configura estas variables en Railway Dashboard → Variables:

```bash
# DATABASE_URL se configura automáticamente al agregar PostgreSQL
DATABASE_URL=postgresql://...  # Auto-generada por Railway PostgreSQL

# Panel Administrativo (CRÍTICO - REQUERIDO)
ADMIN_KEY=tu_clave_admin_muy_segura_minimo_8_caracteres

# Configuración del sitio
NEXT_PUBLIC_SITE_URL=https://tu-proyecto.railway.app
NEXT_PUBLIC_SITE_NAME=López y Escobar Abogados
NEXT_PUBLIC_SITE_DESCRIPTION=Firma de abogados especializada en derecho corporativo, civil, penal y administrativo

# Environment
NODE_ENV=production
```

### Variables Opcionales

```bash
# Analytics (si las usas)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# SEO adicional
NEXT_PUBLIC_VERCEL_URL=https://tu-proyecto.railway.app
```

## 🗄️ Configuración de Base de Datos

### 1. Agregar PostgreSQL Plugin

1. En tu proyecto Railway, ve a la pestaña "Plugins"
2. Busca y agrega "PostgreSQL"
3. Railway generará automáticamente la `DATABASE_URL`

### 2. Crear Migraciones y Tablas

**CRÍTICO:** El proyecto necesita crear las migraciones antes del despliegue:

```bash
# 1. Crear la migración inicial (REQUERIDO)
npx prisma migrate dev --name init

# 2. Verificar que se creó la migración
ls prisma/migrations/

# 3. Generar el cliente Prisma
npx prisma generate
```

### 3. Ejecutar Migraciones en Producción

Las migraciones se ejecutarán automáticamente durante el build gracias al script `postinstall`.

Si necesitas ejecutarlas manualmente en Railway:

```bash
# Aplicar migraciones en producción
npm run db:migrate

# Verificar conexión y tablas
npm run db:studio
```

### 4. Verificar Tablas Creadas

Después del despliegue, verifica que las tablas existen:

```sql
-- Conectar a Railway PostgreSQL y verificar:
\dt  -- Listar todas las tablas

-- Deberías ver:
-- news
-- team_members  
-- contact_messages
```

## � **PROBLEMA ESPECÍFICO: Error "tabla news no existe"**

### Descripción del Error
```
Error [PrismaClientKnownRequestError]:
Invalid `prisma.news.findMany()` invocation:
The table `public.news` does not exist in the current database.
```

### 🔧 **Solución Paso a Paso (EJECUTAR EN ORDEN)**

### 🔧 **Solución Paso a Paso (EJECUTAR EN ORDEN)**

#### **OPCIÓN A: Usando Railway CLI (Recomendado)**

```bash
# 1. Instalar Railway CLI (si no está instalado)
curl -fsSL https://railway.app/install.sh | sh

# 2. Ejecutar script automatizado
./scripts/apply-migrations-railway.sh
```

#### **OPCIÓN B: Usando Prisma Localmente**

```bash
# 1. Crear migración inicial
npx prisma migrate dev --name init

# 2. Verificar migración creada
ls -la prisma/migrations/

# 3. Commit y deploy a Railway
git add prisma/migrations/
git commit -m "feat: add database migrations"
git push origin main
```

#### **OPCIÓN C: SQL Manual en Railway Dashboard**

1. Ve a Railway Dashboard → PostgreSQL Plugin → Connect
2. Ejecuta el siguiente SQL:

```sql
-- Crear tabla news
CREATE TABLE "news" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "news_slug_key" ON "news"("slug");

-- Crear tabla team_members
CREATE TABLE "team_members" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bio" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "specialties" TEXT NOT NULL,
    "education" TEXT,
    "experience" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

-- Crear tabla contact_messages
CREATE TABLE "contact_messages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "company" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "source" TEXT NOT NULL DEFAULT 'WEB_FORM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);
```

### 🎯 **Comandos Directos para Railway CLI**

Si tienes Railway CLI instalado:

```bash
# 1. Conectar a tu proyecto
railway login
railway link

# 2. Aplicar migraciones directamente
railway run npx prisma migrate deploy

# 3. Verificar tablas creadas
railway connect
# Dentro de PostgreSQL: \dt
```

### ✅ **Verificación de Éxito**

Después de aplicar las migraciones, deberías poder:
1. **Cargar noticias** sin error 500
2. **Crear nuevas noticias** en `/admin`
3. **Ver las tablas** en Railway PostgreSQL:
   - `news` 
   - `team_members`
   - `contact_messages`

## �🚀 Pasos de Despliegue

### 1. Preparación del Repositorio

```bash
# Asegúrate de que todos los cambios estén commiteados
git add .
git commit -m "feat: configuración para Railway deployment"
git push origin main
```

### 2. Crear Proyecto en Railway

1. Ve a [Railway Dashboard](https://railway.app/dashboard)
2. Clic en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Conecta tu repositorio

### 3. Configuración del Proyecto

1. **Agregar PostgreSQL:**
   - Ve a la pestaña "Plugins"
   - Agrega "PostgreSQL"
   - La `DATABASE_URL` se configurará automáticamente

2. **Configurar Variables de Entorno:**
   - Ve a la pestaña "Variables"
   - Agrega las variables listadas arriba

3. **Configurar Build Settings (si es necesario):**
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Root Directory: `/`

### 4. Verificar Despliegue

1. Railway iniciará automáticamente el despliegue
2. Monitorea los logs en la pestaña "Deployments"
3. Una vez completado, tu app estará disponible en el dominio proporcionado

## 🔍 Verificación Post-Despliegue

### Checklist de Verificación

- [ ] ✅ Sitio web carga correctamente
- [ ] ✅ Base de datos PostgreSQL conectada
- [ ] ✅ Páginas estáticas funcionan
- [ ] ✅ Formularios de contacto operativos
- [ ] ✅ Imágenes y assets cargan correctamente
- [ ] ✅ SEO metadata presente
- [ ] ✅ Favicon visible
- [ ] ✅ Responsive design funcional

### URLs a Verificar

- `/` - Página principal
- `/nosotros` - Acerca de
- `/servicios` - Servicios
- `/equipo` - Equipo
- `/noticias` - Blog/Noticias
- `/contacto` - Formulario de contacto
- `/admin` - **Panel administrativo (requiere ADMIN_KEY)**

### 🔐 Panel Administrativo

Después del despliegue, verifica el acceso al panel:

1. **URL:** `https://tu-proyecto.railway.app/admin`
2. **Clave:** La definida en variable `ADMIN_KEY`
3. **Funciones disponibles:**
   - Gestión de noticias
   - Administración del equipo
   - Visualización de mensajes de contacto

### 🛡️ Configuración de Seguridad

El panel incluye medidas de seguridad:
- **Rate limiting:** 5 intentos por IP cada 15 minutos
- **Logs de acceso:** Registrados en Railway logs
- **Validación:** Clave mínimo 8 caracteres
- **Sesión temporal:** Se cierra al cerrar navegador

## 🛠️ Comandos Útiles

```bash
# Generar cliente Prisma
npm run db:generate

# Aplicar migraciones
npm run db:migrate

# Abrir Prisma Studio (desarrollo)
npm run db:studio

# Push cambios de schema sin migración
npm run db:push
```

## 🐛 Troubleshooting

### Error de Base de Datos

Si hay problemas de conexión a la BD:

1. Verifica que PostgreSQL plugin esté agregado
2. Confirma que `DATABASE_URL` esté configurada
3. Revisa logs de Railway para errores específicos

### Error de Build

Si el build falla:

1. Verifica que todas las dependencias estén en `package.json`
2. Asegúrate de que `prisma generate` se ejecute antes del build
3. Revisa que no haya errores de TypeScript

### Error de Variables de Entorno

Si hay variables faltantes:

1. Verifica que todas las variables requeridas estén configuradas
2. Asegúrate de que no haya typos en los nombres
3. Redeploya después de agregar variables faltantes

## 📞 Soporte

Si encuentras problemas:

1. Revisa los logs de Railway
2. Verifica la [documentación de Railway](https://docs.railway.app/)
3. Consulta la [comunidad de Railway](https://railway.app/discord)

---

✨ **¡Tu sitio estará listo para servir a los clientes de López y Escobar Abogados!**
