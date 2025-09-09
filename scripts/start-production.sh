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

# Ejecutar migraciones en background para no bloquear el startup
echo "🗄️ Iniciando migraciones en background..."

(
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
        echo "⚠️  Migraciones fallaron - se aplicarán en la próxima solicitud"
        break
      fi
      
      echo "⚠️  Migración falló, reintentando en 5 segundos..."
      sleep 5
    fi
  done
) &

# No esperar a las migraciones para arrancar el servidor
echo "✅ Migraciones iniciadas en background"

echo "🔥 Iniciando servidor Next.js en modo standalone..."

# Configurar puerto para Railway - CRÍTICO
export PORT=${PORT:-3000}
export HOSTNAME=${HOSTNAME:-0.0.0.0}

echo "🌐 Servidor iniciando en $HOSTNAME:$PORT"

# Mostrar información del entorno
echo "📊 Información del entorno:"
echo "   - NODE_ENV: ${NODE_ENV:-development}"
echo "   - PORT: $PORT"
echo "   - HOSTNAME: $HOSTNAME"
echo "   - DATABASE_URL: [CONFIGURADA]"

# Iniciar el servidor con variables explícitas
echo "🎯 Ejecutando: PORT=$PORT HOSTNAME=$HOSTNAME node .next/standalone/server.js"
PORT=$PORT HOSTNAME=$HOSTNAME exec node .next/standalone/server.js
