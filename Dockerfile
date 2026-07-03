# Stable Stars - imagen de producción
# Multi-stage no hace falta (no hay paso de build), pero sí usuario no-root
# y solo dependencias de producción para mantener la imagen mínima.

FROM node:20-alpine

# Usuario sin privilegios (por defecto Docker corre como root, mala práctica).
# UID/GID fijos (1001) -- importante: si se dejan sin fijar, Alpine asigna el
# siguiente disponible y puede variar entre reconstrucciones, lo que rompe el
# dueño de la carpeta ./data montada como volumen desde el host (ver
# docker-compose.yml y deploy/deploy.sh, que usan este mismo 1001 fijo).
RUN addgroup -g 1001 -S stablestars && adduser -u 1001 -S stablestars -G stablestars

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY app.js auth.js data.js portal.js serve.js index.html style.css ./

# La carpeta data/ real vive en el host (se monta como volumen desde
# docker-compose.yml), así que este chown solo importa para el primer
# arranque sin volumen montado (ej. pruebas locales sin docker-compose).
RUN mkdir -p /app/data && chown -R stablestars:stablestars /app

USER stablestars

ENV HOST=0.0.0.0
ENV PORT=5183
EXPOSE 5183

# Node trae "fetch" nativo desde v18, lo usamos para el healthcheck sin
# depender de curl/wget (que ni siquiera vienen en node:alpine).
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||5183)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "serve.js"]
