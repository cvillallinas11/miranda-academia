#!/usr/bin/env bash
# ============================================================
# Stable Stars - preparación inicial del VPS de Hostinger
#
# Ejecuta esto UNA SOLA VEZ en un VPS Ubuntu recién creado, como root
# (o con sudo). Después de esto, los despliegues los hace GitHub Actions.
#
# Uso:
#   1. Copia este archivo al VPS (scp o pegándolo por SSH)
#   2. Reemplaza las variables de la sección "CONFIGURA ESTO" abajo
#   3. chmod +x setup-vps.sh && sudo ./setup-vps.sh
# ============================================================
set -euo pipefail

# ---------------- CONFIGURA ESTO ----------------
DEPLOY_USER="deploy"                     # usuario sin privilegios que hará los despliegues
APP_DIR="/opt/stable-stars"              # dónde vivirá el código en el VPS
DOMAIN="TU_DOMINIO.com"                  # tu dominio real
EMAIL_FOR_CERTBOT="tu_correo@ejemplo.com" # para avisos de renovación de certificado
# -------------------------------------------------

echo "== Actualizando el sistema =="
apt-get update -y && apt-get upgrade -y

echo "== Instalando dependencias básicas =="
apt-get install -y ca-certificates curl gnupg ufw fail2ban git

echo "== Instalando Docker y el plugin docker compose =="
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

echo "== Instalando nginx y certbot =="
apt-get install -y nginx certbot python3-certbot-nginx

echo "== Creando usuario de despliegue sin privilegios de root =="
if ! id -u "$DEPLOY_USER" >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" "$DEPLOY_USER"
  usermod -aG docker "$DEPLOY_USER"
  echo "Usuario '$DEPLOY_USER' creado y agregado al grupo docker."
  echo "Ahora copia tu llave pública SSH a /home/$DEPLOY_USER/.ssh/authorized_keys"
  echo "(esa llave privada es la que va en el secreto VPS_SSH_KEY de GitHub, ver DEPLOYMENT.md)"
else
  echo "El usuario '$DEPLOY_USER' ya existe, se omite."
fi

echo "== Preparando carpeta de la app =="
mkdir -p "$APP_DIR"
chown -R "$DEPLOY_USER":"$DEPLOY_USER" "$APP_DIR"

echo "== Configurando el firewall (solo SSH, HTTP, HTTPS) =="
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "== Activando fail2ban contra fuerza bruta por SSH =="
systemctl enable --now fail2ban

echo "== Deshabilitando login SSH por contraseña (solo llaves) =="
echo "IMPORTANTE: confirma que ya puedes entrar por llave SSH antes de que este script"
echo "corte el acceso por contraseña. Si no estás seguro, hazlo manualmente después."
read -p "¿Ya probaste el acceso SSH por llave y funciona? (escribe 'si' para desactivar contraseñas) " CONFIRM
if [ "$CONFIRM" = "si" ]; then
  sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
  systemctl restart sshd
  echo "Login por contraseña deshabilitado."
else
  echo "Se deja el login por contraseña activo por ahora. Hazlo tú luego con:"
  echo "  sudo sed -i 's/^#\\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config && sudo systemctl restart sshd"
fi

echo ""
echo "============================================================"
echo " Listo. Próximos pasos manuales (están en DEPLOYMENT.md):"
echo " 1) Apunta el DNS de $DOMAIN a la IP de este VPS"
echo " 2) Copia deploy/nginx.conf.example -> /etc/nginx/sites-available/stable-stars"
echo "    y deploy/proxy_params_stablestars.example -> /etc/nginx/proxy_params_stablestars"
echo "    reemplazando TU_DOMINIO.com por $DOMAIN"
echo " 3) sudo ln -s /etc/nginx/sites-available/stable-stars /etc/nginx/sites-enabled/"
echo " 4) sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN -m $EMAIL_FOR_CERTBOT --agree-tos"
echo " 5) Clona el repo en $APP_DIR como el usuario '$DEPLOY_USER'"
echo " 6) Crea $APP_DIR/.env con tus credenciales reales (ADMIN_EMAIL, ADMIN_PASSWORD, etc.)"
echo " 7) Configura los secretos de GitHub Actions y haz el primer despliegue"
echo "============================================================"
