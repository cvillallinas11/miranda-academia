# Despliegue de Stable Stars — GitHub → VPS de Hostinger → tu dominio

Este documento es la guía paso a paso para dejar la app corriendo en internet
con actualizaciones que se hacen "en cascada con autorización": cada cambio
que se sube a `main` en GitHub queda **pausado esperando tu aprobación manual**
antes de tocar el servidor de producción.

```
Tú/Claude editan código  →  push a GitHub (rama main)
                              │
                              ▼
                    GitHub Actions: job "verify"
                    (sintaxis + la app realmente arranca
                     + los archivos sensibles siguen bloqueados)
                              │
                              ▼
                    ⏸  Espera tu aprobación manual
                       (pestaña "Actions" en GitHub)
                              │  tú apruebas
                              ▼
                    Job "deploy": SSH al VPS → docker compose up
                              │
                              ▼
                    https://tu-dominio.com (en vivo)
```

No puedo ejecutar ninguno de estos pasos por ti (no tengo tu VPS ni tu
cuenta de GitHub), pero todos los archivos que necesitas ya están listos en
el proyecto. Aquí te digo exactamente qué hacer con cada uno.

---

## 0. Lo que necesitas tener antes de empezar

- [ ] Una cuenta de GitHub
- [ ] Un VPS de Hostinger con **Ubuntu 22.04 o 24.04**, con acceso root por SSH
- [ ] Un dominio (o subdominio) que puedas apuntar a la IP del VPS
- [ ] Una cuenta de Gmail para el envío de correos (opcional pero recomendado)

---

## 1. Crear el repositorio en GitHub

1. En GitHub, crea un repositorio **privado** (no público — aunque los
   secretos no se suben, un repo privado es más prudente para una app con
   datos de una menor de edad).
2. Desde tu computador, dentro de la carpeta `miranda-academia/`:

   ```bash
   git init
   git add .
   git commit -m "Stable Stars: versión inicial lista para desplegar"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```

   El `.gitignore` ya está configurado para que `.env`, `data/*.json` y
   `data/*.log` (secretos, usuarios, progreso, auditoría) **nunca** se suban.
   Verifica con `git status` antes del primer commit que no aparezcan.

---

## 2. Preparar el VPS

1. Conéctate por SSH como root: `ssh root@IP_DEL_VPS`
2. Copia `deploy/setup-vps.sh` al VPS (por ejemplo con `scp` desde tu
   computador, o pegando su contenido en un archivo nuevo con `nano`).
3. Abre el script y reemplaza las variables de la sección `CONFIGURA ESTO`
   (usuario de despliegue, carpeta de la app, tu dominio, tu correo).
4. Ejecútalo:

   ```bash
   chmod +x setup-vps.sh
   sudo ./setup-vps.sh
   ```

   Esto instala Docker, nginx, certbot, activa el firewall (UFW: solo SSH,
   80 y 443), activa fail2ban contra fuerza bruta por SSH, y crea un
   usuario `deploy` sin privilegios de root para los despliegues.

5. **Antes de que el script desactive el login por contraseña**, asegúrate
   de tener acceso por llave SSH funcionando. Genera un par de llaves si no
   tienes (`ssh-keygen -t ed25519 -C "stable-stars-deploy"`), y copia la
   llave **pública** a `/home/deploy/.ssh/authorized_keys` en el VPS. La
   llave **privada** es la que usarás en el secreto `VPS_SSH_KEY` de GitHub
   (paso 4) — nunca la compartas ni la pegues en un chat.

### Apuntar el dominio

En el panel de DNS de tu dominio (puede ser el propio Hostinger u otro),
crea:
- Un registro `A` con nombre `@` apuntando a la IP del VPS
- Un registro `A` con nombre `www` apuntando a la misma IP

Espera a que propague (unos minutos a un par de horas).

### Configurar nginx + HTTPS

```bash
# En el VPS, como root:
cp deploy/nginx.conf.example /etc/nginx/sites-available/stable-stars
cp deploy/proxy_params_stablestars.example /etc/nginx/proxy_params_stablestars
nano /etc/nginx/sites-available/stable-stars   # reemplaza TU_DOMINIO.com por tu dominio real

ln -s /etc/nginx/sites-available/stable-stars /etc/nginx/sites-enabled/
nginx -t   # debe decir "syntax is ok"

certbot --nginx -d TU_DOMINIO.com -d www.TU_DOMINIO.com -m tu_correo@ejemplo.com --agree-tos
# certbot reescribe el bloque de nginx automáticamente con las rutas del certificado
systemctl reload nginx
```

Certbot deja programada la renovación automática del certificado (no
tienes que hacer nada más para eso).

### Primer despliegue manual (para dejar todo listo antes de automatizar)

```bash
# Como el usuario 'deploy', no como root:
su - deploy
cd /opt/stable-stars   # o la carpeta que hayas elegido
git clone https://github.com/TU_USUARIO/TU_REPO.git .

cp .env.example .env
nano .env
# Completa ADMIN_EMAIL, ADMIN_PASSWORD (¡segura, 8+ caracteres!),
# SMTP_USER/SMTP_PASS, y agrega estas dos líneas que solo importan en producción:
#   HOST=0.0.0.0
#   TRUST_PROXY=1

# Importante: el contenedor corre como usuario sin privilegios (UID 1001).
# Sin esto, Docker crea ./data con dueño root y la app truena al arrancar
# con "EACCES: permission denied". deploy/deploy.sh ya lo hace en cada
# despliegue automático, pero en este primer arranque manual hay que
# hacerlo a mano una vez:
mkdir -p data
chown -R 1001:1001 data

docker compose up -d --build
docker compose logs -f app   # revisa que arrancó sin errores, Ctrl+C para salir
```

Visita `https://TU_DOMINIO.com` — deberías ver la pantalla de login de
Stable Stars con el candado 🔒 del navegador activo.

---

## 3. Configurar los secretos de GitHub Actions

En tu repositorio de GitHub: **Settings → Secrets and variables → Actions →
New repository secret**. Crea estos cuatro:

| Secreto | Valor |
|---|---|
| `VPS_HOST` | La IP (o dominio) de tu VPS |
| `VPS_USER` | `deploy` (el usuario que creó `setup-vps.sh`) |
| `VPS_SSH_KEY` | La llave **privada** SSH completa (la que corresponde a la pública que pusiste en el VPS) |
| `VPS_PORT` | `22` (o el puerto SSH que uses) |

Y como variable normal (no secreta) puedes ajustar `VPS_APP_DIR` si tu ruta
no es `/opt/stable-stars` — o simplemente edita el valor por defecto
directamente en `.github/workflows/deploy.yml`.

---

## 4. Cómo funciona la autorización en cascada (lo más importante de este pedido)

**Nota de licencia importante:** GitHub solo permite el gate elegante de
"Required reviewers" (un botón "Approve and deploy" con revisores
específicos) en environments de repositorios privados si tienes **GitHub
Pro** (~US$4/mes) o superior. Este repo quedó creado como privado en el
plan gratuito, así que lo intenté configurar y GitHub lo rechazó por el
plan. En vez de forzarte a pagar sin preguntarte, dejé montado el mecanismo
gratuito equivalente, que cumple exactamente lo que pediste — nada se
despliega solo:

- Un **push normal a `main`** (por ejemplo, cuando yo subo un cambio desde
  Claude) dispara **solo** el job `verify`: revisa sintaxis, levanta el
  servidor y confirma que la seguridad no se rompió. **Nunca toca el VPS.**
- Para que un cambio llegue de verdad a producción, **tú** (o quien tenga
  acceso de escritura al repo) tiene que ir a la pestaña **Actions** del
  repo y hacer clic en **"Run workflow"** a mano, eligiendo la rama `main`.
  Eso es lo que dispara el job `deploy` (que sí está condicionado a
  `workflow_dispatch`, no a push).

En la práctica: yo puedo dejar el código listo y subido, pero **el botón
que realmente pone la app en internet solo lo puedes apretar tú**, desde
tu cuenta de GitHub. Esa es la "autorización" que pediste.

### Si más adelante quieres el gate con aprobadores explícitos

1. Actualiza el repo a GitHub Pro (Settings → Billing) o transfiérelo a una
   organización con GitHub Team.
2. **Settings → Environments → production → Required reviewers**, agrégate
   (y a quien más quieras que pueda aprobar).
3. En `deploy.yml`, quita la línea `if: github.event_name == 'workflow_dispatch'`
   del job `deploy` para que vuelva a dispararse en cada push — GitHub
   pausará el job hasta que alguien apruebe desde un botón "Review
   deployments" (más pulido, permite comentarios y varios revisores).

---

## 5. El día a día: cómo se actualiza la app

1. Se edita el código (en Claude, localmente, como sea) y se sube a GitHub
   — directo a `main`, o mejor aún, por un Pull Request que tú revisas y
   apruebas antes de mergear (doble capa de control).
2. GitHub Actions corre `verify` automáticamente — revisa el resultado en
   la pestaña Actions (✅ o ❌), sin que nada toque el VPS todavía.
3. Cuando quieras que ese cambio quede en vivo: pestaña **Actions** → **"Deploy
   Stable Stars"** (el workflow) → botón **"Run workflow"** → rama `main` →
   **"Run workflow"** de nuevo para confirmar.
4. En 10-20 segundos la nueva versión está en `https://TU_DOMINIO.com`.

---

## 6. Rollback (si algo sale mal)

```bash
# En el VPS:
cd /opt/stable-stars
git log --oneline -10          # busca el commit bueno anterior
git reset --hard <commit-bueno>
docker compose up -d --build
```

Los datos (`data/users.json`, `data/progress.json`, etc.) viven en un
volumen fuera del contenedor, así que un rollback de código **no borra**
las cuentas ni el progreso guardado.

---

## 7. Ver logs y auditoría

```bash
# Logs de la app en vivo:
docker compose logs -f app

# Auditoría de acciones administrativas (quién creó/borró/reseteó qué):
cat data/audit.log
```

---

## Checklist final — lo que TÚ debes completar

- [ ] Dominio real en vez de `TU_DOMINIO.com` en `deploy/nginx.conf.example`
      y en `.github/workflows/deploy.yml` (campo `url:`)
- [ ] Repo de GitHub creado y con el código subido
- [ ] VPS con `setup-vps.sh` ejecutado
- [ ] DNS del dominio apuntando al VPS
- [ ] Certificado HTTPS emitido con certbot
- [ ] `.env` real creado en el VPS (nunca en GitHub)
- [ ] Primer `docker compose up -d --build` corrido manualmente y verificado
- [ ] 4 secretos de GitHub Actions configurados
- [ ] Environment `production` creado con "Required reviewers" activado
