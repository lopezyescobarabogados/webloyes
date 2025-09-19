#!/bin/bash

# Script específico para aplicar migración de campos PDF
# Este script aplica solo la migración necesaria para agregar campos PDF

set -e

echo "🗄️ Aplicando migración de campos PDF..."

# Verificar que tenemos DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL no está configurada"
    exit 1
fi

echo "ℹ️ Base de datos: $(echo $DATABASE_URL | cut -d'@' -f2 | cut -d'/' -f1)"

# Aplicar solo la migración específica de PDF
echo "🔄 Ejecutando migración: Add PDF fields..."

# Ejecutar la migración específica
cat << 'EOF' | psql "$DATABASE_URL"
-- Add PDF fields to news table if they don't exist
DO $$
BEGIN
    -- Check if pdfUrl column exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'news' AND column_name = 'pdfUrl'
    ) THEN
        ALTER TABLE "news" ADD COLUMN "pdfUrl" TEXT;
        RAISE NOTICE 'Added pdfUrl column';
    ELSE
        RAISE NOTICE 'pdfUrl column already exists';
    END IF;
    
    -- Check if pdfName column exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'news' AND column_name = 'pdfName'
    ) THEN
        ALTER TABLE "news" ADD COLUMN "pdfName" TEXT;
        RAISE NOTICE 'Added pdfName column';
    ELSE
        RAISE NOTICE 'pdfName column already exists';
    END IF;
END $$;
EOF

echo "✅ Migración de campos PDF completada"

# Ejecutar prisma generate para actualizar el cliente
echo "🔄 Regenerando cliente Prisma..."
npx prisma generate

echo "✅ Migración aplicada exitosamente"
