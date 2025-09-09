#!/bin/bash

# Script post-build para copiar binarios de Prisma al standalone
# Soluciona el error "Query Engine not found" en Railway

set -e

echo "🔧 Copiando binarios de Prisma al standalone..."

# Directorios
STANDALONE_DIR=".next/standalone"
PRISMA_CLIENT_DIR="node_modules/.prisma/client"
STANDALONE_PRISMA_DIR="$STANDALONE_DIR/node_modules/.prisma/client"

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
        echo "⚠️  No se encontraron binarios .node"
    fi
else
    echo "❌ ERROR: Directorio de Prisma client no encontrado"
    exit 1
fi

# Copiar también @prisma/client desde node_modules
STANDALONE_MODULES_DIR="$STANDALONE_DIR/node_modules/@prisma"
mkdir -p "$STANDALONE_MODULES_DIR"

if [ -d "node_modules/@prisma/client" ]; then
    echo "📦 Copiando @prisma/client..."
    cp -r "node_modules/@prisma/client" "$STANDALONE_MODULES_DIR/"
fi

echo "✅ Script post-build completado"
