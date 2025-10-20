## Tareas App – Frontend (Next.js + TypeScript)

Este proyecto corresponde a una aplicación de tareas realizada en **Next.js**, que implementa el frontend de la app conectada a una API REST externa.

---

## Descripción de la App

La aplicación permite **crear y listar tareas** a través de una interfaz de usuario construida con **Next.js 15**, **TypeScript**, y **React**.  
Las tareas se almacenan en una base de datos PostgreSQL accesible mediante una **API REST**, también desplegada en Vercel.




---

## Tecnologías Utilizadas

- **Next.js 15** – Framework React para aplicaciones fullstack.  
- **TypeScript** – Tipado estático y detección temprana de errores.  
- **React 19** – Librería base para la interfaz de usuario.  
- **Prisma ORM** – Mapeo objeto-relacional usado en la API (backend).  
- **Vitest** – Framework para pruebas unitarias rápidas.  
- **TailwindCSS** – Librería CSS para un diseño visual limpio y adaptable.  
- **Vercel** – Plataforma de despliegue en la nube.

---


## Instrucciones de Instalación y Ejecución Local

Estos pasos son para ejecutar la aplicación en el entorno local.

### Clonar el repositorio

```bash
git clone https://github.com/mvttias47/tareas-app.git
cd tareas-app
```

## Instalar dependencias

```bash
npm install
```
## Configurar variables de entorno
```bash
# Crea un archivo .env.local en la raíz del proyecto y define la URL base de la API:

NEXT_PUBLIC_API_URL=https://tareas-api-rho.vercel.app
```

## Ejecutar
```bash
npm run dev
```
## build de producción
```bash
npm run build
npm start
```
## Luego abre en tu navegador en
```bash
http://localhost:3000
```
### Pruebas (Vitest + RTL)

Requisitos:
- Node 20+ 

```bash
nvm use 20
node -v
rm -rf node_modules package-lock.json
npm i
npm run test










