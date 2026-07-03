#!/usr/bin/env bash
# ============================================================
# Stable Stars - script de despliegue
#
# Lo ejecuta GitHub Actions por SSH en el VPS, dentro de la carpeta de la
# app, DESPUÉS de que un humano autorizó el despliegue en GitHub (ver el
# workflow .github/workflows/deploy.yml y DEPLOYMENT.md).
#
# También lo puedes correr tú a mano si alguna vez necesitas desplegar
# manualmente: ssh al VPS, cd a la carpeta de la app, y ./deploy/deploy.sh
# ============================================================
set -euo pipefail

# Ruta absoluta fija, sin importar desde dónde se invoque este script --
# importante para que coincida EXACTO con la ruta que autoriza la regla de
# sudoers (sudo compara el comando de forma literal, no resuelve rutas
# relativas). Ver DEPLOYMENT.md.
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"

echo "== Descargando la última versión aprobada de main =="
git fetch origin main
git reset --hard origin/main

# El contenedor corre como usuario sin privilegios con UID/GID fijo 1001
# (ver Dockerfile). Cualquier operación que toque ./data como root (por
# ejemplo, otra persona corriendo "docker compose down/up" a mano) puede
# devolver su dueño a otro usuario -- así que este chown corre SIEMPRE, no
# es opcional. Como el runner de GitHub Actions corre como un usuario sin
# privilegios (ghrunner, ver DEPLOYMENT.md), usamos "sudo -n" con una regla
# sudoers acotada a *solo* este comando exacto (ruta absoluta, ver
# DEPLOYMENT.md) para poder aplicarlo sin pedir contraseña.
echo "== Asegurando permisos de la carpeta data/ =="
mkdir -p "$APP_DIR/data"
if ! chown -R 1001:1001 "$APP_DIR/data" 2>/dev/null; then
  sudo -n chown -R 1001:1001 "$APP_DIR/data"
fi

echo "== Construyendo y levantando el contenedor =="
docker compose pull --ignore-pull-failures || true
docker compose up -d --build --remove-orphans

echo "== Limpiando imágenes viejas (ahorra espacio en el VPS) =="
docker image prune -f

echo "== Verificando que la app responda =="
sleep 3
if curl -fsS "http://127.0.0.1:${PORT:-5183}/" > /dev/null; then
  echo "✅ Despliegue exitoso, la app responde."
else
  echo "❌ La app no respondió después de desplegar. Revisa los logs:"
  echo "   docker compose logs --tail=100 app"
  exit 1
fi
