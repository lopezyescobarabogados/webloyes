-- AlterTable: Add PDF fields to existing news table
ALTER TABLE "news" ADD COLUMN "pdfUrl" TEXT;
ALTER TABLE "news" ADD COLUMN "pdfName" TEXT;
