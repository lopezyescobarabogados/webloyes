<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# López y Escobar Abogados - Instrucciones para Copilot

## Stack Tecnológico

- **Next.js v15+**: Framework React con SSR/SSG y App Router
- **TypeScript**: Tipado estricto para prevenir errores
- **Tailwind CSS**: Framework CSS utilitario para estilos responsive
- **React Hook Form**: Manejo de formularios y validaciones
- **Zod**: Validación de esquemas y datos
- **Prisma**: ORM con SQLite para gestión de base de datos
- **Framer Motion**: Animaciones suaves y accesibles

## Estructura del Proyecto

- Usar App Router de Next.js 15
- Componentes en `src/components/`
- Páginas en `src/app/`
- API routes en `src/app/api/`
- Tipos TypeScript en `src/types/`
- Utilidades en `src/lib/` y `src/utils/`
- Datos estáticos en `src/data/`
- Estilos globales con Tailwind CSS

## Convenciones de Código

- Usar TypeScript estricto
- Componentes funcionales con hooks
- Props tipadas con interfaces
- Nombres de archivos en kebab-case
- Componentes en PascalCase
- Hooks personalizados con prefijo "use"

## Características Específicas

- Enfoque en SEO con metadata optimizada
- Animaciones accesibles con Framer Motion
- Formularios validados con React Hook Form
- Diseño responsive con Tailwind CSS
- Componentes reutilizables y modulares

## CMS y Contenido

- Datos almacenados en archivos JSON
- Tipos definidos para noticias y equipo
- Funciones de utilidad para cargar datos
- Estructura preparada para migrar a CMS headless
