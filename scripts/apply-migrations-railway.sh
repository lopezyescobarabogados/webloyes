#!/bin/bash

# Script para aplicar migraciones en Railway PostgreSQL
# López y Escobar Abogados - Solución Error "tabla news no existe"

echo "🚀 Iniciando aplicación de migraciones en Railway..."

# Verificar que Railway CLI esté instalado
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI no está instalado"
    echo "📦 Instalar con: curl -fsSL https://railway.app/install.sh | sh"
    exit 1
fi

# Paso 1: Login a Railway
echo "🔑 Conectando a Railway..."
railway login

# Paso 2: Conectar al proyecto
echo "🔗 Enlazando proyecto..."
railway link

# Paso 3: Aplicar migraciones SQL directamente
echo "📊 Aplicando migraciones de base de datos..."
railway run psql -f scripts/create-migrations.sql

# Paso 4: Verificar tablas creadas
echo "🔍 Verificando tablas creadas..."
railway run psql -c "\dt"

# Paso 5: Generar cliente Prisma (si Node.js está disponible)
echo "⚙️ Generando cliente Prisma..."
railway run npx prisma generate

echo "✅ Migraciones aplicadas exitosamente!"
echo "🎯 Las siguientes tablas deberían estar disponibles:"
echo "   - news"
echo "   - team_members"
echo "   - contact_messages"
echo ""
echo "🌐 Ahora puedes probar tu aplicación en Railway"
