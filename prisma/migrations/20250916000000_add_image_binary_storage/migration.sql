-- Agregar columnas para almacenamiento binario de imágenes en PostgreSQL
-- Estas columnas complementan la columna imageUrl existente sin afectarla

-- Agregar columna para datos binarios de la imagen
ALTER TABLE "news" ADD COLUMN "imageData" BYTEA;

-- Agregar columna para el tipo MIME de la imagen
ALTER TABLE "news" ADD COLUMN "imageType" TEXT;

-- Crear índice para optimizar búsquedas por tipo de imagen
CREATE INDEX "news_imageType_idx" ON "news"("imageType") WHERE "imageType" IS NOT NULL;

-- Comentarios de documentación
COMMENT ON COLUMN "news"."imageData" IS 'Datos binarios de la imagen almacenados en PostgreSQL';
COMMENT ON COLUMN "news"."imageType" IS 'Tipo MIME de la imagen (image/jpeg, image/png, image/webp, etc.)';
