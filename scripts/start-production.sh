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

# Ejecutar migraciones con reintentos
echo "🗄️ Ejecutando migraciones de base de datos..."
MAX_RETRIES=3
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if npx prisma migrate deploy; then
        echo "✅ Migraciones aplicadas exitosamente"
        break
    else
        RETRY_COUNT=$((RETRY_COUNT + 1))
        echo "⚠️  Intento de migración ${RETRY_COUNT}/${MAX_RETRIES} falló"
        
        if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
            echo "❌ ERROR: No se pudieron aplicar las migraciones después de ${MAX_RETRIES} intentos"
            exit 1
        fi
        
        echo "� Reintentando en 5 segundos..."
        sleep 5
    fi
done

# Generar cliente Prisma (por si acaso)
echo "📦 Verificando cliente Prisma..."
npx prisma generate

echo "🔥 Iniciando servidor Next.js en modo standalone..."
echo "🌐 Servidor disponible en puerto ${PORT:-3000}"

# Iniciar el servidor
exec node .next/standalone/server.js
