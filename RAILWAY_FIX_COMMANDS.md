# COMANDOS DIRECTOS PARA TERMINAL

# 1. Instalar Railway CLI (si no está instalado)
curl -fsSL https://railway.app/install.sh | sh

# 2. Autenticar y conectar
railway login
railway link

# 3. Aplicar migraciones (SOLUCIÓN PRINCIPAL)
railway run npx prisma migrate deploy

# 4. Generar cliente Prisma
railway run npx prisma generate

# 5. Verificar tablas creadas
railway run psql -c "\dt"

# 6. (Opcional) Verificar datos en tabla news
railway run psql -c "SELECT COUNT(*) FROM news;"
