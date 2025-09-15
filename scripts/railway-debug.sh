#!/bin/bash
# Script de debugging para Railway
echo "🚂 Railway Deploy Debug - $(date)"
echo "==========================================="

# Información del entorno
echo "📦 Node.js version: $(node --version)"
echo "📦 NPM version: $(npm --version)"
echo "📦 Working directory: $(pwd)"

# Variables de entorno importantes
echo "🌍 Environment variables:"
echo "NODE_ENV: $NODE_ENV"
echo "DATABASE_URL: ${DATABASE_URL:0:20}..." # Solo primeros 20 chars por seguridad

# Verificar archivos importantes
echo "📂 Important files:"
ls -la package.json 2>/dev/null && echo "✅ package.json exists" || echo "❌ package.json missing"
ls -la prisma/schema.prisma 2>/dev/null && echo "✅ schema.prisma exists" || echo "❌ schema.prisma missing"
ls -la railway.toml 2>/dev/null && echo "✅ railway.toml exists" || echo "❌ railway.toml missing"

# Verificar migraciones
echo "📊 Prisma migrations:"
ls -la prisma/migrations/ 2>/dev/null || echo "❌ No migrations found"

echo "==========================================="
echo "🔄 Starting build process..."
