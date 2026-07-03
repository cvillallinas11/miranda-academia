# Seguridad de Stable Stars

Resumen de qué se hizo y qué debes mantener tú una vez esté en producción.
Pensado para una app familiar con datos de una menor de edad — el estándar
es "difícil de comprometer sin ser paranoico", no nivel banco.

## Lo que ya está implementado en el código

**Autenticación**
- Contraseñas nunca en texto plano: hash + salt con `scrypt` (función
  diseñada para contraseñas, no un hash genérico como SHA).
- Comparación de contraseña con `crypto.timingSafeEqual` (evita filtrar
  información por el tiempo de respuesta).
- Mínimo 8 caracteres para cualquier contraseña nueva.
- Bloqueo de cuenta 15 minutos tras 5 intentos fallidos seguidos (protege
  contra fuerza bruta, incluso si el atacante cambia de IP).
- Sesiones con expiración (30 días) en vez de vivir para siempre.
- El super admin se define en `.env`, no hay registro abierto — solo el
  admin crea cuentas nuevas, con lista cerrada de roles.

**Autorización**
- Cada endpoint valida el rol de la sesión (admin/padre/niño) antes de
  responder — un padre no puede ver el progreso de un niño que no sea suyo
  (probado), nadie puede borrar al super admin (probado).

**Servidor**
- Los archivos se sirven por **lista blanca explícita**, no por acceso
  libre al disco — antes de esta revisión, `/serve.js`, `/.env` o
  `/data/users.json` eran accesibles directo por URL; ahora solo los
  archivos públicos exactos (`index.html`, `style.css`, `*.js` del
  frontend) responden, cualquier otra ruta da 404.
- Límite de tamaño de cuerpo en las peticiones (1 MB).
- Límite de solicitudes por IP (120/min sobre `/api/*`), independiente del
  bloqueo específico de login.
- Cabeceras de seguridad en toda respuesta: `Content-Security-Policy`
  estricta (sin scripts inline permitidos), `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`,
  `Referrer-Policy`, `Permissions-Policy`.
- Sin CORS abierto — la app es de un solo origen (mismo dominio sirve todo).
- Log de auditoría (`data/audit.log`) de creación/edición/borrado de
  usuarios, reseteo de contraseñas, logins fallidos y bloqueos.

**Infraestructura (una vez desplegado según DEPLOYMENT.md)**
- El puerto de Node (5183) solo escucha en `127.0.0.1` dentro del VPS —
  nginx es la única puerta pública, con TLS (Let's Encrypt) obligatorio.
- Firewall (UFW) solo permite SSH, 80 y 443.
- `fail2ban` activo contra fuerza bruta por SSH.
- Login SSH por contraseña deshabilitado (solo llaves).
- Contenedor Docker corre como usuario sin privilegios, no como root.
- Rate-limit adicional a nivel de nginx sobre `/api/auth/login` y `/api/*`.
- Despliegues requieren aprobación manual de un humano (GitHub
  Environments) — ningún cambio llega a producción automáticamente.

## Lo que tienes que mantener TÚ

- **Backups**: la carpeta `data/` en el VPS (`users.json`, `progress.json`,
  `sessions.json`, `audit.log`) es todo lo que hay que respaldar. Una copia
  semanal (`scp` a tu computador, o un cron con `tar` + subida a algún
  storage) es suficiente para una app familiar.
- **Actualiza el VPS**: `sudo apt update && sudo apt upgrade` cada cierto
  tiempo (parches de seguridad del sistema operativo).
- **Rota la contraseña del admin** de vez en cuando (cámbiala en `.env` y
  reinicia el contenedor).
- **Activa 2FA en tu cuenta de GitHub** — es la puerta de entrada a todo el
  pipeline de despliegue.
- **Revisa `data/audit.log`** de vez en cuando por actividad rara (logins
  fallidos repetidos, usuarios creados que no reconoces).
- **No le des el rol `admin`** a nadie que no debería poder crear/borrar
  cuentas o ver el progreso de cualquier niño.

## Si sospechas que algo se comprometió

1. En el VPS: `docker compose down` (apaga la app de inmediato).
2. Revisa `data/audit.log` y `docker compose logs` buscando actividad rara.
3. Cambia `ADMIN_PASSWORD` en `.env` y, si usas SMTP, regenera la
   contraseña de aplicación de Gmail.
4. Revisa/rota la llave SSH del VPS (`VPS_SSH_KEY` en GitHub también).
5. Vuelve a levantar con `docker compose up -d --build`.

## Qué NO cubre esta configuración (para que lo sepas, no es una promesa vacía)

- No hay 2FA para las cuentas de padres/niños dentro de la app (solo
  correo + contraseña). Para una app familiar de bajo perfil es un balance
  razonable de seguridad vs. facilidad de uso para una niña de primaria;
  si más adelante quieres 2FA para las cuentas de admin/padres, es un
  cambio adicional que se puede agregar.
- El almacenamiento es en archivos JSON en disco, no una base de datos con
  cifrado en reposo. Para el volumen de datos de esta app (unas pocas
  cuentas) es suficiente, pero no es lo que usarías para datos masivos o
  más sensibles.
