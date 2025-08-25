#!/bin/bash

# Script de post-deploy para Railway
# Este script se ejecuta después del despliegue para inicializar la base de datos

echo "🚀 Iniciando script de post-deploy..."

# Generar cliente Prisma
echo "📦 Generando cliente Prisma..."
npx prisma generate

# Ejecutar migraciones
echo "🗄️ Ejecutando migraciones de base de datos..."
npx prisma migrate deploy

echo "✅ Post-deploy completado exitosamente!"
