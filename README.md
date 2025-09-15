# 📚 Documentación Completa - López & Escobar Abogados Asociados

## 🏛️ **Información General del Proyecto**

**Sitio web corporativo** para López & Escobar Abogados Asociados - Firma de abogados especializada en derecho corporativo, civil, penal y administrativo.

### **Stack Tecnológico**
- **Framework**: Next.js 15.4.5 con App Router
- **Lenguaje**: TypeScript (tipado estricto)
- **Estilos**: Tailwind CSS 4.0
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Formularios**: React Hook Form + Zod validation
- **Animaciones**: Framer Motion
- **Deploy**: Railway (automático con git push)
- **PWA**: Manifest configurado para instalación

---

## 🏗️ **Arquitectura del Sistema**

### **Estructura de Directorios**

```
webloyes/
├── .env                           # Variables de entorno
├── package.json                   # Dependencias y scripts
├── next.config.ts                 # Configuración Next.js
├── tailwind.config.ts             # Configuración Tailwind
├── tsconfig.json                  # Configuración TypeScript
├── railway.toml                   # Configuración deploy Railway
├── prisma/
│   ├── schema.prisma              # Esquema de base de datos
│   └── migrations/                # Migraciones SQL
├── public/                        # Archivos estáticos
├── src/                           # Código fuente
└── scripts/                       # Scripts de producción
```

---

## 📁 **Directorio `public/` - Archivos Estáticos**

### **Logos e Identidad Visual**
- `Logo1.png` - Logo principal del bufete (formato raster)
- `Logo2.svg` - Logo vectorial del bufete (escalable)
- `icon.svg` - Icono principal vectorial

### **Iconos PWA (Progressive Web App)**
```
icons/
├── icon-48.png      # Favicon pequeño
├── icon-72.png      # Móviles pequeños  
├── icon-96.png      # Móviles estándar
├── icon-128.png     # Tablets
├── icon-192.png     # Android/iOS instalación
├── icon-256.png     # Windows tiles
├── icon-384.png     # Pantallas HD
└── icon-512.png     # Splash screens/Open Graph
```

### **Configuración SEO/PWA**
- `favicon.ico` - Favicon tradicional para navegadores
- `manifest.json` - Configuración PWA (instalación, shortcuts)
- `robots.txt` - Configuración para buscadores

### **Imágenes del Sistema**
```
images/
├── hero/            # Imágenes del hero/banner principal
├── icons/           # Iconos auxiliares del sistema
├── news/            # Placeholders para noticias
│   ├── placeholder.svg
│   ├── announcements-placeholder.svg
│   ├── design-placeholder.svg
│   ├── marketing-placeholder.svg
│   └── tech-placeholder.svg
└── team/            # Fotos del equipo de abogados
```

---

## 💻 **Directorio `src/` - Código Fuente**

### **`src/app/` - Páginas y Rutas (App Router)**

#### **Páginas Principales**
- `page.tsx` - Página de inicio
- `layout.tsx` - Layout principal con metadatos
- `globals.css` - Estilos globales
- `robots.ts` - Generación dinámica de robots.txt
- `sitemap.ts` - Generación dinámica de sitemap.xml

#### **Páginas Públicas**
```
├── contacto/page.tsx              # Formulario de contacto
├── cookies/page.tsx               # Política de cookies
├── equipo/page.tsx                # Equipo de abogados
├── newsletter/page.tsx            # Suscripción a newsletter
├── nosotros/page.tsx              # Información del bufete
├── noticias/page.tsx              # Blog/noticias legales
├── noticias/[slug]/page.tsx       # Artículo individual
├── politica-privacidad/page.tsx   # Política de privacidad
├── servicios/page.tsx             # Servicios jurídicos
└── terminos/page.tsx              # Términos y condiciones
```

#### **Panel Administrativo**
```
admin/
├── layout.tsx                     # Layout del admin (autenticación)
├── page.tsx                       # Dashboard principal
├── contacto/page.tsx              # Gestión de contactos
├── equipo/page.tsx                # Gestión del equipo
├── newsletter/page.tsx            # Gestión de suscriptores
└── noticias/page.tsx              # Gestión de noticias
```

#### **API Routes**
```
api/
├── contact/route.ts               # API contacto
├── contact/[id]/route.ts          # Contacto individual
├── health/route.ts                # Health check
├── health/database/route.ts       # Verificación BD
├── news/route.ts                  # API noticias
├── news/[id]/route.ts             # Noticia individual
├── newsletter/subscribe/route.ts  # Suscripción newsletter
├── team/route.ts                  # API equipo
├── team/[id]/route.ts             # Miembro individual
└── admin/                         # APIs administrativas
    ├── auth/route.ts              # Autenticación
    ├── images/route.ts            # Subida de imágenes
    ├── news/route.ts              # CRUD noticias
    ├── news/[id]/route.ts         # Noticia específica
    ├── newsletter/route.ts        # Gestión newsletter
    ├── team/route.ts              # CRUD equipo
    ├── upload/route.ts            # Subida de archivos
    └── verify/route.ts            # Verificación admin
```

### **`src/components/` - Componentes Reutilizables**

#### **Componentes Principales**
- `Analytics.tsx` - Google Analytics
- `Logo.tsx` - Componente del logo
- `NewsModal.tsx` - Modal para mostrar noticias

#### **Componentes por Categoría**
```
accessibility/                     # Accesibilidad
├── AccessibilityProviders.tsx     # Proveedores de accesibilidad

admin/                             # Panel administrativo
├── AdminAuth.tsx                  # Autenticación
├── AdminDashboard.tsx             # Dashboard principal
├── ContactsList.tsx               # Lista de contactos
├── NewsEditor.tsx                 # Editor de noticias
├── TeamEditor.tsx                 # Editor de equipo
└── NewsletterManager.tsx          # Gestor de newsletter

contact/                           # Formularios de contacto
├── ContactForm.tsx                # Formulario principal
└── ContactSuccess.tsx             # Confirmación de envío

navigation/                        # Navegación
├── Header.tsx                     # Cabecera del sitio
├── Footer.tsx                     # Pie de página
├── MobileMenu.tsx                 # Menú móvil
└── Navigation.tsx                 # Navegación principal

newsletter/                        # Sistema de newsletter
├── NewsletterForm.tsx             # Formulario suscripción
├── ShareButton.tsx                # Botón compartir con dropdown
├── NewsShareButton.tsx            # Botón compartir noticias
└── SubscriptionModal.tsx          # Modal de suscripción

seo/                              # SEO y metadatos
├── MetaTags.tsx                  # Meta tags dinámicos
└── StructuredData.tsx            # Datos estructurados

team/                             # Equipo de abogados
├── TeamGrid.tsx                  # Grid del equipo
├── TeamMember.tsx                # Tarjeta de miembro
└── TeamModal.tsx                 # Modal información detallada

ui/                               # Componentes UI reutilizables
├── Button.tsx                    # Botones personalizados
├── Input.tsx                     # Inputs de formulario
├── Modal.tsx                     # Modal base
├── Loading.tsx                   # Indicadores de carga
└── Toast.tsx                     # Notificaciones
```

### **`src/data/` - Datos Estáticos**
- `legal-services.ts` - Información de servicios jurídicos

### **`src/hooks/` - Custom Hooks**
- `useSubscriptionModal.ts` - Hook para modal de newsletter

### **`src/layouts/` - Layouts**
- `MainLayout.tsx` - Layout principal del sitio

### **`src/lib/` - Librerías y Utilidades**
- `metadata.ts` - Configuración SEO y metadatos
- `performance.tsx` - Optimizaciones de performance
- `prisma.ts` - Cliente de Prisma (singleton)
- `structured-data.tsx` - Datos estructurados JSON-LD

### **`src/styles/` - Estilos**
- `colors.css` - Variables de colores personalizados

### **`src/types/` - Definiciones TypeScript**
- `content.ts` - Tipos para contenido (noticias, equipo)
- `modal.ts` - Tipos para modales

### **`src/utils/` - Funciones Utilitarias**
- `constants.ts` - Constantes del sistema
- `generateShareLink.ts` - Generación de enlaces compartidos
- `textFormatting.ts` - Formateo de texto
- `textUtils.ts` - Utilidades de texto
- `validations.ts` - Esquemas de validación Zod

---

## 🗄️ **Base de Datos - Prisma Schema**

### **Modelos de Datos**

#### **News (Noticias)**
```typescript
model News {
  id          String   @id @default(cuid())
  title       String   # Título de la noticia
  slug        String   @unique # URL amigable
  excerpt     String   # Resumen breve
  content     String   # Contenido completo
  author      String   # Autor del artículo
  category    String   # Categoría legal
  tags        String   # Tags JSON
  published   Boolean  @default(false)
  featured    Boolean  @default(false)
  imageUrl    String?  # Imagen destacada
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### **TeamMember (Equipo)**
```typescript
model TeamMember {
  id          String   @id @default(cuid())
  name        String   # Nombre completo
  position    String   # Cargo en el bufete
  description String   # Descripción breve
  bio         String?  # Biografía extendida
  email       String?  # Email de contacto
  phone       String?  # Teléfono
  imageUrl    String?  # Foto del abogado
  order       Int      @default(0)
  active      Boolean  @default(true)
  specialties String   # Especialidades JSON
  education   String?  # Formación académica
  experience  String?  # Experiencia profesional
}
```

#### **Contact (Contactos)**
```typescript
model Contact {
  id          String   @id @default(cuid())
  name        String   # Nombre del contacto
  email       String   # Email
  phone       String?  # Teléfono
  subject     String   # Asunto de consulta
  message     String   # Mensaje
  source      String   @default("web")
  status      String   @default("pending")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### **NewsletterSubscription (Newsletter)**
```typescript
model NewsletterSubscription {
  id        String   @id @default(cuid())
  name      String   # Nombre del suscriptor
  email     String   @unique # Email único
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🛡️ **Panel Administrativo**

### **Funcionalidades del Admin**

#### **📊 Dashboard Principal**
- Vista general del sistema
- Estadísticas de contactos, noticias y suscriptores
- Métricas de rendimiento
- Acceso rápido a funciones principales

#### **📰 Gestión de Noticias**
- **CRUD Completo**: Crear, leer, actualizar y eliminar noticias
- **Editor Rico**: Editor WYSIWYG para contenido HTML
- **Gestión de Imágenes**: Subida y optimización automática
- **Categorías**: Organización por áreas jurídicas
- **Tags**: Sistema de etiquetado flexible
- **Estados**: Borrador/Publicado/Destacado
- **SEO**: Meta descripciones y URLs amigables
- **Vista Previa**: Previsualización antes de publicar

#### **👥 Gestión de Equipo**
- **Perfiles Completos**: Información profesional detallada
- **Especialidades**: Áreas de práctica legal
- **Fotos Profesionales**: Gestión de imágenes optimizadas
- **Orden Personalizable**: Jerarquía y ordenamiento del equipo
- **Información de Contacto**: Email y teléfono individual
- **Control de Visibilidad**: Activar/desactivar miembros

#### **📧 Gestión de Contactos**
- **Lista Completa**: Todas las consultas recibidas
- **Estados de Seguimiento**: Pendiente, en proceso, resuelto
- **Filtros Avanzados**: Por fecha, estado, tipo de consulta
- **Vista Detallada**: Información completa de cada contacto
- **Gestión de Estados**: Cambio de estado de seguimiento

#### **📬 Gestión de Newsletter**
- **Lista de Suscriptores**: Todos los emails suscritos
- **Control de Estado**: Activar/desactivar suscripciones
- **Métricas de Suscripción**: Estadísticas de crecimiento
- **Gestión Masiva**: Operaciones en lote

### **🔐 Seguridad del Panel**

#### **Autenticación**
- **Clave Maestra**: Sistema de autenticación simple pero efectivo
- **Variables de Entorno**: Clave configurable via `ADMIN_KEY`
- **Protección de Rutas**: Middleware automático en todas las rutas admin
- **Sesión Persistente**: Mantenimiento de sesión en localStorage

#### **Validación de Datos**
- **Esquemas Zod**: Validación robusta en cliente y servidor
- **Sanitización**: Limpieza automática de inputs
- **Manejo de Errores**: Sistema robusto de error handling
- **Rate Limiting**: Protección contra ataques de fuerza bruta

---

## 🚀 **Railway Deployment**

### **Configuración de Deploy**

#### **railway.toml**
```toml
[build]
builder = "nixpacks"
buildCommand = "npm run railway:build"

[deploy]
deployCommand = "npm run railway:deploy"
startCommand = "npm start"
healthcheckPath = "/api/health"
healthcheckTimeout = 300
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 3

[env]
NODE_ENV = "production"
```

#### **Scripts de Deploy**
```json
{
  "railway:build": "prisma generate && prisma db push && npm run build",
  "railway:deploy": "prisma migrate deploy",
  "railway:postdeploy": "./scripts/railway-postdeploy.sh"
}
```

### **Base de Datos en Railway**
- **PostgreSQL**: Base de datos gestionada
- **Migraciones Automáticas**: Deploy automático de esquemas
- **Backups**: Respaldos automáticos diarios
- **SSL**: Conexiones seguras por defecto

### **Variables de Entorno de Producción**
```env
# Railway configurará automáticamente
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SITE_URL="https://tu-dominio.railway.app"
ADMIN_KEY="clave-segura-produccion"
```

---

## 🎨 **PWA y Optimización**

### **Progressive Web App**

#### **Manifest Configuration**
```json
{
  "name": "López y Escobar Abogados",
  "short_name": "L&E Abogados",
  "theme_color": "#1e40af",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/"
}
```

#### **Service Worker**
- **Caching Strategy**: Cache-first para assets estáticos
- **Offline Fallback**: Páginas offline para funcionalidad básica
- **Background Sync**: Sincronización de formularios offline

### **Iconos Optimizados**
```
public/icons/
├── icon-72x72.png     # iOS Safari
├── icon-96x96.png     # Android Chrome
├── icon-128x128.png   # Desktop PWA
├── icon-144x144.png   # Windows tiles
├── icon-152x152.png   # iOS homescreen
├── icon-192x192.png   # Android splash
├── icon-384x384.png   # Android launcher
└── icon-512x512.png   # High-res devices
```

### **Performance Optimizaciones**

#### **Core Web Vitals**
- **LCP**: < 2.5s (First Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

#### **Técnicas de Optimización**
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic bundle splitting
- **Lazy Loading**: Component-level lazy loading
- **Preloading**: Critical resources preloading
- **Compression**: Gzip/Brotli compression

---

## 🔧 **Desarrollo y Scripts**

### **Scripts de Desarrollo**

#### **Comandos Principales**
```bash
npm run dev              # Servidor de desarrollo
npm run build            # Build de producción
npm run start            # Servidor de producción
npm run lint             # Linting de código
npm run lint:fix         # Corrección automática
npm run type-check       # Verificación TypeScript
```

#### **Scripts de Base de Datos**
```bash
npx prisma generate      # Generar cliente Prisma
npx prisma db push       # Aplicar cambios al esquema
npx prisma studio        # Interface visual de BD
npx prisma migrate reset # Reset completo de BD
```

#### **Scripts de Limpieza**
```bash
npm run clean:news       # Limpiar imágenes temporales de noticias
npm run clean:all        # Limpieza completa del sistema
```

### **Workflow de Desarrollo**

#### **Setup Inicial**
```bash
# 1. Clonar proyecto
git clone <repository-url>
cd webloyes

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Configurar base de datos
npx prisma generate
npx prisma db push

# 5. Iniciar desarrollo
npm run dev
```

#### **Proceso de Deploy**
```bash
# 1. Verificar código
npm run lint
npm run type-check

# 2. Build de producción
npm run build

# 3. Deploy a Railway
git push origin main
```

---

## 📊 **SEO y Analytics**

### **Optimización SEO**

#### **Meta Tags Dinámicos**
- **Título**: Específico por página con marca
- **Descripción**: Meta descriptions optimizadas
- **Keywords**: Términos jurídicos relevantes
- **Canonical URLs**: Prevención de contenido duplicado

#### **Open Graph**
```typescript
export const defaultOpenGraph = {
  type: 'website',
  siteName: 'López y Escobar Abogados Asociados',
  locale: 'es_CO',
  images: [
    {
      url: '/images/og-default.jpg',
      width: 1200,
      height: 630,
      alt: 'López y Escobar Abogados Asociados'
    }
  ]
}
```

#### **Datos Estructurados (JSON-LD)**
- **Organization Schema**: Información del bufete
- **LegalService Schema**: Servicios jurídicos
- **Person Schema**: Perfiles de abogados
- **Article Schema**: Artículos del blog

### **Sitemap y Robots**

#### **Sitemap Dinámico**
```typescript
export async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: `${siteUrl}/`, priority: 1.0, changeFrequency: 'monthly' },
    { url: `${siteUrl}/nosotros`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${siteUrl}/servicios`, priority: 0.9, changeFrequency: 'monthly' },
    // ... páginas dinámicas de noticias y equipo
  ]
}
```

#### **Robots.txt**
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://lopezescobarabogados.com/sitemap.xml
```

---

## 🛠️ **Configuración Técnica**

### **TypeScript Configuration**

#### **tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### **Next.js Configuration**

#### **next.config.ts**
```typescript
const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['@tabler/icons-react'],
  }
}
```

### **Tailwind Configuration**

#### **tailwind.config.ts**
```typescript
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }
  }
}
```

---

## 🧪 **Testing y Calidad**

### **Linting y Formateo**

#### **ESLint Configuration**
```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### **Validación de Datos**

#### **Esquemas Zod**
```typescript
// Validación de noticias
export const newsSchema = z.object({
  title: z.string().min(5).max(200),
  slug: z.string().min(1),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(50),
  author: z.string().min(2),
  category: z.string().min(1),
  published: z.boolean().default(false),
  featured: z.boolean().default(false)
})

// Validación de contacto
export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(5).max(200),
  message: z.string().min(20).max(2000)
})
```

---

## 📋 **Mantenimiento**

### **Tareas de Mantenimiento Regulares**

#### **Mensual**
- Actualizar dependencias npm
- Revisar logs de errores
- Optimizar imágenes acumuladas
- Verificar métricas de performance

#### **Trimestral**
- Backup completo de base de datos
- Auditoría de seguridad
- Revisión de contenido obsoleto
- Análisis de SEO y posicionamiento

### **Comandos de Limpieza**

#### **Limpieza de Cache**
```bash
# Limpiar cache de Next.js
rm -rf .next

# Limpiar node_modules
rm -rf node_modules
npm install

# Limpiar archivos temporales
npm run clean:all
```

#### **Mantenimiento de Base de Datos**
```bash
# Optimizar base de datos
npx prisma db push

# Verificar integridad
npx prisma validate

# Regenerar cliente
npx prisma generate
```

---

## 🚨 **Troubleshooting**

### **Problemas Comunes**

#### **Error de Build**
```bash
# Verificar tipos
npm run type-check

# Limpiar cache
rm -rf .next
npm run build
```

#### **Problemas de Base de Datos**
```bash
# Reset completo
npx prisma migrate reset

# Regenerar esquema
npx prisma db push
```

#### **Errores de Deploy**
```bash
# Verificar variables de entorno
echo $DATABASE_URL

# Verificar conexión BD
npm run health:db
```

### **Logs y Debugging**

#### **Verificación de Salud**
```bash
# Health check general
curl https://tu-dominio.railway.app/api/health

# Health check de base de datos
curl https://tu-dominio.railway.app/api/health/database
```

---

## 📞 **Soporte y Contacto**

### **Documentación Adicional**
- **Railway Docs**: [railway.app/docs](https://railway.app/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Prisma Docs**: [prisma.io/docs](https://prisma.io/docs)
- **Tailwind Docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

### **Soporte Técnico**
Para soporte técnico o consultas sobre el proyecto:
- **Repositorio**: [GitHub Issues](https://github.com/tu-repo/issues)
- **Documentación**: Este README completo
- **Logs**: Verificar `/api/health` para diagnósticos

---

## 📄 **Licencia**

Este proyecto está bajo la **Licencia MIT**. Ver el archivo `LICENSE` para más detalles.

---

**🏛️ Desarrollado con ❤️ para López y Escobar Abogados Asociados**

*Sistema web completo con panel administrativo, newsletter, PWA y deploy automatizado en Railway.*

#### **Autenticación**
- Sistema de login con clave maestra (`ADMIN_KEY`)
- Protección de rutas administrativas
- Verificación de acceso en cada API

#### **Gestión de Noticias**
- **CRUD completo**: Crear, leer, actualizar, eliminar
- **Editor enriquecido**: Formato de texto, imágenes
- **Gestión de categorías**: Derecho corporativo, civil, penal, etc.
- **Sistema de tags**: Etiquetado para organización
- **Estados**: Borrador/Publicado, Destacado
- **SEO**: URLs amigables (slugs), metadatos
- **Subida de imágenes**: Para noticias destacadas

#### **Gestión del Equipo**
- **Perfiles de abogados**: Información completa
- **Especialidades**: Áreas de práctica
- **Biografías**: Formación y experiencia
- **Fotos profesionales**: Subida y gestión
- **Orden de visualización**: Jerarquía personalizable
- **Estado activo/inactivo**: Control de visibilidad

#### **Gestión de Contactos**
- **Lista de consultas**: Todas las consultas recibidas
- **Estados**: Pendiente, En proceso, Resuelto
- **Filtros**: Por fecha, estado, tipo
- **Detalles completos**: Información del cliente
- **Seguimiento**: Historial de gestión

#### **Gestión de Newsletter**
- **Lista de suscriptores**: Todos los emails registrados
- **Estados**: Activo/Inactivo
- **Estadísticas**: Número de suscriptores
- **Gestión**: Activar/desactivar suscripciones
- **Exportación**: Lista para campañas de email

### **APIs Administrativas**

#### **Seguridad**
- Verificación de `ADMIN_KEY` en cada request
- Validación de datos con Zod schemas
- Error handling completo
- Logs de actividad administrativa

#### **Endpoints Principales**
```
POST /api/admin/auth          # Autenticación
GET  /api/admin/verify        # Verificar sesión
POST /api/admin/upload        # Subir imágenes
GET  /api/admin/images        # Gestión de imágenes

# Noticias
GET    /api/admin/news        # Listar noticias
POST   /api/admin/news        # Crear noticia
PUT    /api/admin/news/[id]   # Actualizar noticia
DELETE /api/admin/news/[id]   # Eliminar noticia

# Equipo  
GET    /api/admin/team        # Listar equipo
POST   /api/admin/team        # Agregar miembro
PUT    /api/admin/team/[id]   # Actualizar miembro
DELETE /api/admin/team/[id]   # Eliminar miembro

# Newsletter
GET    /api/admin/newsletter  # Listar suscriptores
PUT    /api/admin/newsletter  # Gestionar suscripción
```

---

## 🔧 **Sistema de Newsletter**

### **Funcionalidades**

#### **Suscripción Pública**
- **Modal de suscripción**: Aparece en páginas clave
- **Formulario validado**: React Hook Form + Zod
- **Confirmación visual**: Toast notifications
- **Prevención duplicados**: Email único en BD

#### **Botones de Compartir**
- **ShareButton principal**: Dropdown con redes sociales
  - WhatsApp con mensaje personalizado
  - Facebook sharer
  - Twitter con texto optimizado
  - Copiar enlace con feedback
- **NewsShareButton**: Para compartir noticias específicas
- **Enlaces personalizados**: Con tracking de referencia

#### **Gestión Administrativa**
- **Dashboard de suscriptores**: Lista completa
- **Activar/desactivar**: Soft delete de suscripciones
- **Estadísticas**: Métricas de crecimiento
- **Exportación**: Para herramientas de email marketing

### **Integración**
- **Hero sections**: Call-to-action en páginas principales
- **Página dedicada**: `/newsletter` con información completa
- **Footer**: Suscripción rápida
- **Modal contextual**: Aparece según comportamiento del usuario

---

## 🚀 **Deploy en Railway**

### **Configuración Automática**

#### **Railway.toml**
```toml
[build]
builder = "nixpacks"
buildCommand = "npm run railway:build"

[deploy]
startCommand = "npm start"
restartPolicyType = "always"

[env]
NODE_ENV = "production"
```

#### **Scripts de Deploy**
```json
{
  "railway:build": "prisma generate && prisma migrate deploy && next build",
  "postinstall": "prisma generate"
}
```

### **Variables de Entorno Railway**
```bash
# Base de datos (automática)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Aplicación
NODE_ENV=production
NEXT_PUBLIC_APP_URL=${{RAILWAY_PUBLIC_DOMAIN}}

# Admin
ADMIN_KEY=clave_admin_segura
```

### **Flujo de Deploy**
1. **Git push** → Repository GitHub
2. **Railway detecta** cambios automáticamente
3. **Install dependencies**: `npm install`
4. **Generate Prisma**: `npm run postinstall`
5. **Build optimizado**: `npm run railway:build`
   - Genera cliente Prisma
   - Aplica migraciones a BD
   - Construye aplicación Next.js
6. **Start aplicación**: `npm start`
7. **Health checks**: Verificación automática

### **Migraciones de Base de Datos**
- **Automáticas**: Se aplican en cada deploy
- **Versionadas**: Control de cambios en esquema
- **Seguras**: `migrate deploy` en producción
- **Rollback**: Posible si es necesario

### **Scripts de Producción**
```
scripts/
├── post-build.sh        # Optimizaciones post-build
├── railway-debug.sh     # Debug de deploy
└── start-production.sh  # Inicio optimizado
```

---

## 🎨 **PWA (Progressive Web App)**

### **Configuración**
- **Manifest.json**: Configuración completa de PWA
- **Iconos**: 8 tamaños diferentes (48px a 512px)
- **Shortcuts**: Acceso rápido a páginas clave
- **Instalable**: En móviles y desktop
- **Offline ready**: Service worker configurado

### **Características**
- **Theme color**: #0a2342 (azul corporativo)
- **Display mode**: Standalone (como app nativa)
- **Orientation**: Portrait optimizado
- **Categorías**: Business, Legal, Professional

### **SEO Optimizado**
- **Meta tags**: Open Graph, Twitter Cards
- **Structured data**: JSON-LD para buscadores
- **Sitemap**: Generación automática
- **Robots.txt**: Configuración de indexación
- **Canonical URLs**: URLs canónicas en todas las páginas

---

## 🔐 **Seguridad y Validación**

### **Validación de Datos**
- **Zod schemas**: Validación tipada
- **Sanitización**: Limpieza de inputs
- **Error handling**: Manejo robusto de errores

### **Autenticación Admin**
- **Clave maestra**: Protección del panel admin
- **Middleware**: Verificación en rutas protegidas
- **Sesiones**: Gestión de sesiones administrativas

### **API Security**
- **CORS**: Configuración correcta
- **Rate limiting**: Prevención de spam
- **Input validation**: Validación en todos los endpoints

---

## 📊 **Performance y Optimización**

### **Next.js Optimizations**
- **App Router**: Arquitectura moderna
- **Server Components**: Rendering optimizado
- **Image optimization**: Componente Next/Image
- **Code splitting**: División automática de código
- **Static generation**: Páginas estáticas cuando es posible

### **Tailwind CSS**
- **Purge CSS**: Solo estilos utilizados
- **JIT compilation**: Compilación just-in-time
- **Responsive design**: Mobile-first approach

### **Database Optimization**
- **Prisma ORM**: Queries optimizadas
- **Connection pooling**: Gestión eficiente de conexiones
- **Indexes**: Índices en campos clave

---

## 🎯 **Características Destacadas**

### **Responsive Design**
- **Mobile-first**: Diseño optimizado para móviles
- **Breakpoints**: Tailwind responsive utilities
- **Touch-friendly**: Interfaces táctiles optimizadas

### **Accessibility**
- **ARIA labels**: Etiquetas de accesibilidad
- **Keyboard navigation**: Navegación por teclado
- **Screen readers**: Compatible con lectores de pantalla
- **Color contrast**: Contraste adecuado en todos los elementos

### **Internationalization Ready**
- **Spanish primary**: Idioma principal español
- **SEO español**: Metadatos en español
- **Legal terminology**: Terminología jurídica precisa

---

## 🛠️ **Comandos de Desarrollo**

### **Desarrollo Local**
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting del código
npm run type-check   # Verificación TypeScript
```

### **Base de Datos**
```bash
npm run db:generate  # Generar cliente Prisma
npm run db:push      # Sincronizar esquema (desarrollo)
npm run db:migrate   # Aplicar migraciones (producción)
npm run db:studio    # Interface visual de BD
```

### **Railway**
```bash
npm run railway:build  # Build optimizado para Railway
```

---

## 📝 **Notas Técnicas Importantes**

### **Estructura de Datos**
- **CUID**: IDs únicos para todos los modelos
- **JSON fields**: Tags y especialidades como JSON
- **Timestamps**: CreatedAt/UpdatedAt automáticos
- **Soft deletes**: IsActive flags en lugar de eliminación

### **File Upload**
- **Image optimization**: Compresión automática
- **File validation**: Tipos y tamaños permitidos
- **Storage**: Archivos en directorio público

### **Error Handling**
- **Try-catch**: En todas las operaciones async
- **User feedback**: Mensajes claros para usuarios
- **Logging**: Logs detallados para debugging

### **Environment Variables**
- **Development**: `.env.local` para desarrollo
- **Production**: Variables en Railway Dashboard
- **Security**: Claves sensibles nunca en código

---

## 🎉 **Estado del Proyecto**

### **Completamente Funcional**
- ✅ **Frontend**: Next.js con todas las páginas
- ✅ **Backend**: APIs completas y funcionales
- ✅ **Database**: Prisma con PostgreSQL
- ✅ **Admin Panel**: Gestión completa
- ✅ **Newsletter**: Sistema completo
- ✅ **PWA**: Configuración completa
- ✅ **SEO**: Optimización completa
- ✅ **Deploy**: Railway configurado
- ✅ **Performance**: Optimizado
- ✅ **Security**: Implementada

### **Listo para Producción**
- ✅ **Build exitoso**: Sin errores
- ✅ **TypeScript**: Tipado completo
- ✅ **Testing**: Funcionalidades verificadas
- ✅ **Documentation**: Completa y actualizada

**El sitio web de López & Escobar Abogados Asociados está completamente desarrollado, optimizado y listo para ser utilizado en producción.**

- **Next.js 15+**: Framework React con App Router, SSR y SSG
- **TypeScript**: Tipado estricto para desarrollo seguro
- **Tailwind CSS**: Framework CSS utilitario para estilos responsive
- **React Hook Form**: Manejo eficiente de formularios y validaciones
- **Zod**: Validación de esquemas y datos
- **Prisma**: ORM moderno para gestión de base de datos
- **SQLite**: Base de datos ligera para desarrollo
- **Framer Motion**: Animaciones suaves y accesibles

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js 15
│   ├── admin/             # Panel administrativo
│   ├── api/               # Rutas de API
│   ├── contacto/          # Página de contacto
│   ├── equipo/            # Página del equipo
│   ├── noticias/          # Páginas de noticias
│   └── servicios/         # Páginas de servicios
├── components/            # Componentes reutilizables
│   ├── admin/            # Componentes del panel admin
│   ├── navigation/       # Navegación y footer
│   ├── seo/              # Componentes SEO
│   └── ui/               # Componentes de interfaz
├── data/                 # Datos estáticos
├── lib/                  # Utilidades y configuraciones
├── types/                # Definiciones de tipos TypeScript
└── utils/                # Funciones de utilidad
```

## 🛠️ Instalación y Desarrollo

1. **Instalar dependencias:**

```bash
npm install
```

2. **Ejecutar servidor de desarrollo:**

```bash
npm run dev
```

3. **Abrir en navegador:**
   - [http://localhost:3000](http://localhost:3000)

## 📝 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo con Turbopack
- `npm run build` - Construcción para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Verificación de código con ESLint

## 🎨 Características

- **SEO Optimizado**: Metadata y estructura optimizada para buscadores
- **Responsive Design**: Adaptado a todos los dispositivos y pantallas
- **Animaciones Accesibles**: Implementadas con Framer Motion
- **Formularios Validados**: Usando React Hook Form con Zod
- **Panel Administrativo**: Sistema completo para gestión de contenido
- **Tipado Estricto**: TypeScript en todo el proyecto
- **Base de Datos**: Prisma ORM con SQLite
- **API REST**: Endpoints para noticias, equipo y contacto

## 📄 Funcionalidades

### Panel Administrativo
- Gestión completa de noticias (crear, editar, eliminar)
- Administración del equipo de abogados
- Subida y gestión de imágenes
- Autenticación de administradores

### Sitio Público
- Páginas de servicios legales detalladas
- Sistema de noticias con categorización
- Información del equipo profesional
- Formulario de contacto funcional
- Políticas de privacidad y términos

## 🛠️ Instalación y Desarrollo

1. **Instalar dependencias:**

```bash
npm install
```

2. **Configurar base de datos:**

```bash
npx prisma generate
npx prisma db push
```

3. **Ejecutar servidor de desarrollo:**

```bash
npm run dev
```

4. **Acceder a la aplicación:**
   - Sitio web: [http://localhost:3000](http://localhost:3000)
   - Panel admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## � Scripts Disponibles

- `npm run dev` - Servidor de desarrollo con Turbopack
- `npm run build` - Construcción para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Verificación de código con ESLint
- `npm run lint:fix` - Corrección automática de ESLint
- `npm run format` - Formateo con Prettier
- `npm run type-check` - Verificación de tipos TypeScript

## �🚀 Despliegue

El proyecto está optimizado para despliegue en Vercel o cualquier plataforma que soporte Next.js:

```bash
npm run build
npm run start
```

## 🔧 Variables de Entorno

Crear un archivo `.env.local` con las siguientes variables:

```env
# Configuración de base de datos
DATABASE_URL="postgresql://..."

# Panel Administrativo (REQUERIDO)
ADMIN_KEY="tu_clave_admin_muy_segura_minimo_8_caracteres"

# Configuración del sitio
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="López y Escobar Abogados"
NEXT_PUBLIC_SITE_DESCRIPTION="Firma de abogados especializada en derecho corporativo, civil, penal y administrativo"

# Environment
NODE_ENV="development"
```

### 🔐 Panel Administrativo

El sitio incluye un panel administrativo completo para gestionar:

- **Noticias**: Crear, editar, eliminar y publicar artículos
- **Equipo**: Gestionar perfiles de abogados y staff
- **Mensajes**: Ver consultas de contacto

**Acceso:** `/admin`
**Autenticación:** Clave definida en `ADMIN_KEY`

### 🛡️ Seguridad del Panel Admin

- Rate limiting (5 intentos por IP cada 15 minutos)
- Validación de entrada con Zod
- Autenticación basada en clave de entorno
- Logs de seguridad para auditoría
- Sesión temporal (se cierra al cerrar navegador)

## 📚 Recursos Técnicos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Guía de Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Prisma ORM](https://www.prisma.io/docs)
- [Zod Validation](https://zod.dev/)

---

**Desarrollado para López & Escobar Abogados Asociados** - Firma especializada en derecho corporativo, civil, penal y administrativo.
