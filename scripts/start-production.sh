#!/bin/bash

# Script de inicio para producción en Railway
# Optimizado para deploy sin healthcheck

set -e  # Salir si hay algún error

echo "🚀 Iniciando aplicación López y Escobar Abogados..."

# Verificaciones básicas
[ -z "$DATABASE_URL" ] && { echo "❌ DATABASE_URL faltante"; exit 1; }
[ ! -f ".next/standalone/server.js" ] && { echo "❌ Server.js faltante"; exit 1; }

echo "✅ Verificaciones completadas"

# Ejecutar migraciones en background (no bloquear el startup)
echo "🗄️ Ejecutando migraciones en background..."
npx prisma migrate deploy 2>/dev/null || echo "⚠️ Migraciones se aplicarán después" &

# Variables de entorno para Next.js standalone
export PORT=${PORT:-3000}
export HOSTNAME=${HOSTNAME:-0.0.0.0}
export NODE_ENV=${NODE_ENV:-production}

echo "� Iniciando servidor en puerto $PORT"

# Cambiar al directorio standalone
cd .next/standalone

# Iniciar servidor Next.js
exec node server.js
