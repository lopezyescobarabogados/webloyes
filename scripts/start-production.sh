#!/bin/bash

# Script optimizado para Railway - Next.js
set -e

echo "🚀 Iniciando López y Escobar Abogados..."

# Variables de entorno Railway
export PORT=${PORT:-3000}
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"

echo "📡 Puerto Railway: $PORT"
echo "🌐 Hostname: $HOSTNAME"

# Verificar DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL requerido"
  exit 1
fi

# Ejecutar migraciones Prisma
echo "🗄️ Migraciones Prisma..."
npx prisma migrate deploy || echo "⚠️ Migraciones fallan, continuando..."

# Generar Prisma Client
npx prisma generate

echo "✅ Iniciando Next.js en puerto $PORT"

# CRUCIAL: Usar next start con el puerto de Railway
exec npx next start -p $PORT -H $HOSTNAME
