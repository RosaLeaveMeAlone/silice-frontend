# Silice Frontend

Aplicación web para gestión de recibos con React, autenticación JWT y Tailwind CSS.

## Requisitos

- Node.js v22
- npm

## Stack

- React
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS

## Variables de Entorno

Crear un archivo `.env` basado en `.env.template` con las siguientes variables:

```
VITE_API_URL=http://localhost:3000
```

## Dev

1. Clonar el repositorio
2. Instalar dependencias `npm install`
3. Crear un .env basado en el .env.template
4. Ejecutar el comando `npm run dev`

La aplicación estará disponible en `http://localhost:5173`

## Prod

1. Clonar el repositorio
2. Crear un .env basado en el .env.template
3. Construir la imagen de Docker:

```bash
docker build -t silice-frontend .
docker run -d -p 80:80 silice-frontend
```
