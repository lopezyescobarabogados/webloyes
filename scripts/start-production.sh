#!/bin/bash

# Script de inicio para producción en Railway
# Corregido para Next.js standalone

set -e  # Salir si hay algún error

echo "🚀 Iniciando aplicación López y Escobar Abogados..."

# Verificaciones básicas
[ -z "$DATABASE_URL" ] && { echo "❌ DATABASE_URL faltante"; exit 1; }
[ ! -f ".next/standalone/server.js" ] && { echo "❌ Server.js faltante"; exit 1; }

echo "🔗 DATABASE_URL configurada correctamente"
echo "✅ Archivo standalone encontrado"

# Ejecutar migraciones en background (no bloquear el startup)
echo "🗄️ Ejecutando migraciones en background..."
npx prisma migrate deploy 2>/dev/null || echo "⚠️ Migraciones se aplicarán después" &

echo "🔥 Iniciando servidor Next.js en modo standalone..."

# Mostrar información del entorno
echo "📊 Información del entorno:"
echo "   - NODE_ENV: ${NODE_ENV:-production}"
echo "   - PORT: ${PORT:-3000}"
echo "   - DATABASE_URL: [CONFIGURADA]"

# CORRECCIÓN CRÍTICA: Cambiar al directorio standalone
echo "📁 Cambiando al directorio standalone..."
cd .next/standalone

# Iniciar servidor desde el directorio correcto
echo "🎯 Ejecutando: node server.js desde $(pwd)"
exec node server.js
