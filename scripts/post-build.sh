#!/bin/bash

# Script post-build para copiar binarios de Prisma al standalone
# Soluciona el error "Query Engine not found" en Railway

set -e

echo "🔧 Ejecutando post-build para Railway..."

# Primero ejecutar migraciones de Prisma
echo "🗄️ Aplicando migraciones de base de datos..."
if [ "$NODE_ENV" = "production" ] && [ -n "$DATABASE_URL" ]; then
    echo "🔄 Ejecutando migraciones en producción..."
    npx prisma migrate deploy || echo "⚠️ Warning: Failed to run migrations, continuing..."
else
    echo "ℹ️ Saltando migraciones (no es producción o no hay DATABASE_URL)"
fi

echo "🔧 Copiando binarios de Prisma al standalone..."

# Directorios
STANDALONE_DIR=".next/standalone"
PRISMA_CLIENT_DIR="node_modules/.prisma/client"
STANDALONE_PRISMA_DIR="$STANDALONE_DIR/node_modules/.prisma/client"

# Verificar que standalone existe
if [ ! -d "$STANDALONE_DIR" ]; then
    echo "❌ ERROR: Directorio standalone no encontrado: $STANDALONE_DIR"
    exit 1
fi

# Crear directorio si no existe
mkdir -p "$STANDALONE_PRISMA_DIR"

# Copiar todos los archivos de Prisma
if [ -d "$PRISMA_CLIENT_DIR" ]; then
    echo "📦 Copiando cliente Prisma..."
    cp -r "$PRISMA_CLIENT_DIR"/* "$STANDALONE_PRISMA_DIR/"
    
    # Verificar que los binarios estén presentes
    if ls "$STANDALONE_PRISMA_DIR"/*.node 1> /dev/null 2>&1; then
        echo "✅ Binarios de Prisma copiados exitosamente:"
        ls -la "$STANDALONE_PRISMA_DIR"/*.node
    else
        echo "⚠️  No se encontraron binarios .node, pero continuando..."
    fi
else
    echo "❌ ERROR: Directorio de Prisma client no encontrado: $PRISMA_CLIENT_DIR"
    exit 1
fi

# Copiar también @prisma/client desde node_modules
STANDALONE_MODULES_DIR="$STANDALONE_DIR/node_modules/@prisma"
mkdir -p "$STANDALONE_MODULES_DIR"

if [ -d "node_modules/@prisma/client" ]; then
    echo "📦 Copiando @prisma/client..."
    cp -r "node_modules/@prisma/client" "$STANDALONE_MODULES_DIR/"
else
    echo "⚠️  @prisma/client no encontrado, pero continuando..."
fi

# Copiar archivos de prisma para migraciones
if [ -d "prisma" ]; then
    echo "📦 Copiando archivos de schema y migraciones..."
    cp -r "prisma" "$STANDALONE_DIR/"
fi

echo "✅ Script post-build completado exitosamente"
