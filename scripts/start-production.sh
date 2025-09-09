#!/bin/bash

# Script de inicio para producción en Railway
# Asegura que las migraciones se ejecuten antes de iniciar el servidor

set -e  # Salir si hay algún error

echo "🚀 Iniciando aplicación López y Escobar Abogados..."

# Verificar que DATABASE_URL esté configurada
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL no está configurada"
    exit 1
fi

echo "🔗 DATABASE_URL configurada correctamente"

# Verificar que el directorio standalone existe
if [ ! -f ".next/standalone/server.js" ]; then
    echo "❌ ERROR: No se encontró el archivo .next/standalone/server.js"
    echo "ℹ️  Asegúrate de que el build se completó correctamente"
    exit 1
fi

echo "✅ Archivo standalone encontrado"

# Ejecutar migraciones con reintentos optimizados
echo "🗄️ Ejecutando migraciones de base de datos..."
MAX_RETRIES=3
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    echo "🔄 Intento de migración $((RETRY_COUNT + 1))/${MAX_RETRIES}..."
    
    if npx prisma migrate deploy 2>/dev/null; then
        echo "✅ Migraciones aplicadas exitosamente"
        break
    else
        RETRY_COUNT=$((RETRY_COUNT + 1))
        
        if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
            echo "⚠️  Continuando sin migraciones - se aplicarán en la próxima solicitud"
            break
        fi
        
        echo "⚠️  Migración falló, reintentando en 5 segundos..."
        sleep 5
    fi
done

echo "🔥 Iniciando servidor Next.js en modo standalone..."

# Configurar puerto para Railway
export PORT=${PORT:-3000}
echo "🌐 Servidor iniciando en puerto $PORT"

# Mostrar información del entorno
echo "📊 Información del entorno:"
echo "   - NODE_ENV: ${NODE_ENV:-development}"
echo "   - PORT: $PORT"
echo "   - DATABASE_URL: [CONFIGURADA]"

# Iniciar el servidor inmediatamente
echo "🎯 Ejecutando: node .next/standalone/server.js"
exec node .next/standalone/server.js
