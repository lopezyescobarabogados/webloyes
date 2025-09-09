#!/bin/bash

# Script de inicio para producción en Railway
# Asegura que las migraciones se ejecuten antes de iniciar el servidor

set -e  # Salir si hay algún error

echo "🚀 Iniciando aplicación en modo producción..."

# Verificar que DATABASE_URL esté configurada
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL no está configurada"
    exit 1
fi

echo "🗄️ Ejecutando migraciones de base de datos..."
npx prisma migrate deploy

echo "📦 Generando cliente Prisma..."
npx prisma generate

echo "🔥 Iniciando servidor Next.js..."
node .next/standalone/server.js
