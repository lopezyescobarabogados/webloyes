#!/bin/bash

# Debug script para verificar variables de entorno en Railway
echo "🔍 DEBUG: Variables de entorno en Railway"
echo "=================================="

echo "📊 Variables críticas:"
echo "   - PORT: ${PORT}"
echo "   - HOSTNAME: ${HOSTNAME}"  
echo "   - NODE_ENV: ${NODE_ENV}"
echo "   - DATABASE_URL presente: $([ -n "$DATABASE_URL" ] && echo "SÍ" || echo "NO")"

echo ""
echo "🔍 Todas las variables PORT_*:"
env | grep -i port || echo "No hay variables PORT_*"

echo ""
echo "🔍 Todas las variables relacionadas con Railway:"
env | grep -i railway || echo "No hay variables RAILWAY_*"

echo ""
echo "📁 Información del sistema:"
echo "   - PWD: $(pwd)"
echo "   - USER: $(whoami)"
echo "   - UID: $(id -u)"

echo ""
echo "🔍 ¿Existe server.js?"
ls -la .next/standalone/server.js 2>/dev/null && echo "✅ Server.js encontrado" || echo "❌ Server.js NO encontrado"

echo ""
echo "🔍 Primeras líneas de server.js:"
head -15 .next/standalone/server.js 2>/dev/null || echo "❌ No se puede leer server.js"
