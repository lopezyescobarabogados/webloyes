#!/bin/bash

# Script de inicio para producción en Railway
# Corregido para variables de entorno de Next.js standalone

set -e  # Salir si hay algún error

echo "🚀 Iniciando aplicación López y Escobar Abogados..."

# DEBUG: Ejecutar script de debugging
echo "🔍 Ejecutando debugging de variables..."
./scripts/debug-env.sh

# Verificaciones básicas
[ -z "$DATABASE_URL" ] && { echo "❌ DATABASE_URL faltante"; exit 1; }
[ ! -f ".next/standalone/server.js" ] && { echo "❌ Server.js faltante"; exit 1; }

echo "🔗 DATABASE_URL configurada correctamente"
echo "✅ Archivo standalone encontrado"

# CRÍTICO: Railway variables de entorno - asegurar que estén definidas
export PORT=${PORT:-3000}
export HOSTNAME=${HOSTNAME:-0.0.0.0}
export NODE_ENV=${NODE_ENV:-production}

# Ejecutar migraciones en background (no bloquear el startup)
echo "🗄️ Ejecutando migraciones en background..."
npx prisma migrate deploy 2>/dev/null || echo "⚠️ Migraciones se aplicarán después" &

echo "🔥 Iniciando servidor Next.js en modo standalone..."

# CORRECCIÓN CRÍTICA: Cambiar al directorio standalone
echo "📁 Cambiando al directorio standalone..."
cd .next/standalone

# CRÍTICO: Verificar que las variables estén disponibles en el directorio standalone
echo "🔍 Verificando variables en directorio standalone:"
echo "   - PORT en server: $PORT"
echo "   - HOSTNAME en server: $HOSTNAME"  
echo "   - PWD actual: $(pwd)"

# Iniciar servidor con variables explícitas heredadas
echo "🎯 Ejecutando: PORT=$PORT HOSTNAME=$HOSTNAME node server.js"
PORT=$PORT HOSTNAME=$HOSTNAME exec node server.js
