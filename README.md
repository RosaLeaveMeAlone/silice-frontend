# Silice Frontend

Aplicación web para gestión de recibos con React, autenticación JWT y Tailwind CSS.

## Stack

- React
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS

## Dev

1. Clonar el repositorio
2. Instalar dependencias `npm install`
3. Crear un .env basado en el .env.template
4. Ejecutar el comando `npm run dev`

La aplicación estará disponible en `http://localhost:5173`

## Prod

Para construir la imagen de Docker:

```bash
docker build -t silice-frontend .
docker run -p 80:80 silice-frontend
```
