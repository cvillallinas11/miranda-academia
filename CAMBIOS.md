# Ampliación y correcciones

30 jornadas con 150 minutos orientativos: 120 de actividades generales y 30 de geografía e historia. La duración depende del trabajo escrito, oral y en cuaderno; no se bloquea al alumno por un cronómetro. Hay pausas libres y recuperación al terminar cada etapa.

Los datos existentes conservan sus índices (0–22). Las siete nuevas jornadas se agregan al final. Los puntajes históricos se conservan.

Las tareas nuevas usan fechas de calendario en America/Bogota. Las antiguas con dayIndex se muestran con la fecha correspondiente de julio de 2026. Archivar conserva las realizaciones. Las métricas históricas anteriores sin registro no se pueden reconstruir con certeza.

El progreso pendiente se conserva en este navegador y se reintenta al reconectar o iniciar sesión. No borrar los datos del navegador antes de sincronizar. No hay resolución automática de ediciones simultáneas desde dos dispositivos.

## Verificación

npm test: pruebas de datos, permisos, rutas, guardado, tareas y servidor real con datos temporales aislados.

## Despliegue

Los push ejecutan pruebas; producción requiere Run workflow en main. Deben existir VPS_HOST, VPS_SSH_KEY y VPS_KNOWN_HOSTS (clave pública del servidor comprobada por un canal confiable). El usuario deploy debe tener permisos para el directorio, Docker y el chown limitado documentado. Se usa el SHA probado y HTTPS verificado. Estas condiciones del VPS todavía requieren verificación antes de desplegar. Hacer respaldo de data antes de actualizar.
