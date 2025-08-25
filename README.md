# López y Escobar Abogados - Sitio Web Corporativo

Sitio web corporativo desarrollado con Next.js 15+ para López y Escobar Abogados Asociados, una firma de abogados especializada en derecho corporativo, civil, penal y administrativo. Implementado con TypeScript, Tailwind CSS y tecnologías modernas para ofrecer la mejor experiencia de usuario.

## 🚀 Stack Tecnológico

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

**Desarrollado para López y Escobar Abogados Asociados** - Firma especializada en derecho corporativo, civil, penal y administrativo.
