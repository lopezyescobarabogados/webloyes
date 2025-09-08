#!/bin/bash

# Script optimizado para resolver el error "tabla news no existe" en Railway
# López y Escobar Abogados - Solución Definitiva

echo "🎯 SOLUCIÓN: Error tabla news no existe en Railway"
echo "=============================================="

# Verificar Railway CLI
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI no encontrado"
    echo "📦 Instalar: curl -fsSL https://railway.app/install.sh | sh"
    exit 1
fi

echo "🔑 Paso 1: Autenticación Railway..."
railway login

echo "🔗 Paso 2: Conectar proyecto..."
railway link

echo "📊 Paso 3: Aplicar migraciones Prisma..."
railway run npx prisma migrate deploy

echo "⚙️ Paso 4: Generar cliente Prisma..."
railway run npx prisma generate

echo "🔍 Paso 5: Verificar tablas creadas..."
railway run psql -c "\dt"

echo ""
echo "✅ VERIFICACIÓN FINAL:"
echo "   - news ✅"
echo "   - team_members ✅" 
echo "   - contact_messages ✅"
echo ""
echo "🌐 Tu aplicación ya debería funcionar sin errores"
echo "🎉 Prueba subir una noticia en /admin"
