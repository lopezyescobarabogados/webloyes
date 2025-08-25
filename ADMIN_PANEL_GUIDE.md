# 🔐 Panel Administrativo - Guía de Uso

## 📋 Información General

El panel administrativo de López y Escobar Abogados permite gestionar todo el contenido dinámico del sitio web de forma segura y eficiente.

### 🔑 Acceso al Panel

- **URL:** `/admin`
- **Autenticación:** Clave definida en variable de entorno `ADMIN_KEY`
- **Seguridad:** Rate limiting y logs de acceso

## 🏗️ Arquitectura de Seguridad

### 🛡️ Medidas de Protección

1. **Autenticación por Clave:**
   - Clave almacenada en variable de entorno
   - Validación mínimo 8 caracteres
   - Comparación segura sin timing attacks

2. **Rate Limiting:**
   - Máximo 5 intentos por IP
   - Bloqueo temporal de 15 minutos
   - Reseteo automático tras expiración

3. **Logs de Auditoría:**
   - Registro de accesos exitosos
   - Log de intentos fallidos con detalles
   - Información de IP y User-Agent

4. **Sesión Temporal:**
   - Almacenamiento en sessionStorage
   - Se cierra al cerrar navegador
   - No persistencia en localStorage

## 🚀 Funcionalidades del Panel

### 📰 Gestión de Noticias (`/admin/noticias`)

**Capacidades:**
- ✅ Crear nuevos artículos
- ✅ Editar contenido existente
- ✅ Eliminar noticias
- ✅ Publicar/despublicar
- ✅ Marcar como destacada
- ✅ Gestión de categorías y tags
- ✅ Vista previa en tiempo real

**Campos disponibles:**
- Título y slug automático
- Extracto y contenido completo
- Autor y categoría
- Tags (múltiples)
- Estado de publicación
- Destacado para homepage
- URL de imagen (opcional)

### 👥 Gestión del Equipo (`/admin/equipo`)

**Capacidades:**
- ✅ Agregar nuevos miembros
- ✅ Editar perfiles existentes
- ✅ Eliminar miembros
- ✅ Ordenar por posición
- ✅ Activar/desactivar visibilidad
- ✅ Gestión de especialidades

**Campos disponibles:**
- Nombre y posición
- Descripción y biografía completa
- Email y teléfono de contacto
- URL de imagen profesional
- Orden de aparición
- Estado activo/inactivo
- Especialidades (múltiples)
- Educación y experiencia

### 📧 Mensajes de Contacto (`/admin/contacto`)

**Capacidades:**
- ✅ Ver todos los mensajes recibidos
- ✅ Filtrar por estado y prioridad
- ✅ Marcar como leído/respondido
- ✅ Eliminar mensajes procesados
- ✅ Información completa del remitente

**Información disponible:**
- Datos del contacto (nombre, email, teléfono)
- Asunto y mensaje completo
- Empresa (si aplica)
- Estado del mensaje
- Prioridad asignada
- Fecha y hora de recepción

## 🔧 Configuración Técnica

### Variables de Entorno Requeridas

```bash
# CRÍTICO - Panel no funcionará sin esta variable
ADMIN_KEY="tu_clave_admin_segura_minimo_8_caracteres"

# Base de datos (para almacenar contenido)
DATABASE_URL="postgresql://..."
```

### 🔍 Endpoints de API

```bash
# Autenticación
POST /api/admin/auth
- Body: { "adminKey": "clave" }
- Response: { "success": boolean, "message": string }

# Gestión de noticias
GET    /api/news           # Listar todas
POST   /api/news           # Crear nueva
PUT    /api/news/[id]      # Actualizar
DELETE /api/news/[id]      # Eliminar

# Gestión del equipo
GET    /api/team           # Listar miembros
POST   /api/team           # Crear miembro
PUT    /api/team/[id]      # Actualizar
DELETE /api/team/[id]      # Eliminar

# Mensajes de contacto
GET    /api/contact        # Listar mensajes
POST   /api/contact        # Nuevo mensaje (público)
PUT    /api/contact/[id]   # Actualizar estado
DELETE /api/contact/[id]   # Eliminar mensaje
```

## 🚨 Troubleshooting

### Error: "ADMIN_KEY no configurada"

**Problema:** Variable de entorno faltante
**Solución:**
1. Verificar que `ADMIN_KEY` esté en Railway variables
2. Redeplegar el proyecto
3. Verificar logs en Railway dashboard

### Error: "Demasiados intentos fallidos"

**Problema:** Rate limiting activado
**Solución:**
1. Esperar 15 minutos
2. Verificar que la clave sea correcta
3. Intentar desde otra IP si es urgente

### Error: "No se puede acceder al panel"

**Problema:** Posible error de configuración
**Solución:**
1. Verificar que la URL sea `/admin`
2. Comprobar que el sitio esté desplegado
3. Revisar logs de Railway para errores

### Error: "Base de datos no conectada"

**Problema:** PostgreSQL no configurado
**Solución:**
1. Verificar plugin PostgreSQL en Railway
2. Confirmar `DATABASE_URL` generada
3. Ejecutar migraciones con `npm run db:migrate`

## 📱 Uso Responsivo

El panel está optimizado para:
- **Desktop:** Experiencia completa
- **Tablet:** Funcionalidad adaptada
- **Mobile:** Acceso básico de emergencia

## 🔄 Flujo de Trabajo Recomendado

### Para Noticias:
1. Crear borrador con información básica
2. Completar contenido y tags
3. Revisar vista previa
4. Publicar cuando esté listo

### Para Equipo:
1. Agregar información básica del miembro
2. Completar biografía y especialidades
3. Configurar orden de aparición
4. Activar visibilidad

### Para Mensajes:
1. Revisar mensajes nuevos regularmente
2. Marcar como leído al procesar
3. Actualizar estado según progreso
4. Eliminar mensajes resueltos

## 🔒 Mejores Prácticas de Seguridad

1. **Clave Fuerte:**
   - Mínimo 12 caracteres
   - Combinar letras, números, símbolos
   - No usar palabras del diccionario

2. **Acceso Responsable:**
   - Cerrar sesión después de usar
   - No compartir credenciales
   - Acceder solo desde redes seguras

3. **Monitoreo:**
   - Revisar logs de acceso regularmente
   - Reportar actividad sospechosa
   - Cambiar clave si hay compromiso

---

## 📞 Soporte Técnico

Si encuentras problemas con el panel administrativo:

1. **Revisar logs:** Railway Dashboard → Deployments → Logs
2. **Verificar variables:** Railway Dashboard → Variables
3. **Health check:** Verificar `/api/health`
4. **Documentación:** Consultar esta guía

---

✨ **El panel administrativo está diseñado para ser seguro, eficiente y fácil de usar para gestionar todo el contenido del sitio web profesional de López y Escobar Abogados.**
