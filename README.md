# Xura TSJ

## Iniciar el Proyecto

```bash
# Instala los Módulos de Node
npm install
# Correr el proyecto
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Estructura del Proyecto

```
.
├── app
│   ├── (site)
│   │   ├── dashboard
│   │   │   └── unidad
│   │   └── terminos
│   ├── api
│   │   ├── auth
│   │   └── users
│   ├── autentication
│   ├── components
│   │   ├── common
│   │   │   ├── Cards
│   │   │   ├── Charts
│   │   │   │   └── Bar
│   │   ├── layout
│   │   │   └── site
│   │   └── modals
│   ├── mocks
│   └── services
│       └── handlers
├── public
│   ├── fonts
└── test
    ├── e2e
    ├── integration
    └── unit
```

## Reglas y Buenas Prácticas

Este proyecto utiliza un linter para mantener un código limpio y consistente.
Es muy importante seguir las siguientes reglas y buenas prácticas al trabajar en el código:

```bash
> 1. No suprimir errores del linter.
> 2. Cumplir con las reglas del linter.
> 3. Ejecutar el comando de linter para validar el código una vez termine una tarea.

npm run lint
```

### Consideraciones en la estructura de archivos

> - En la carpeta /app se encuentran los directorios/rutas.
> - Para generar una ruta es necesario crear un directorio.
> - Estos directorios deben agregarse dentro de la carpeta (site)
> - Para poder acceder a ellas es http://localhost:3000/nombreRuta
> - Para que Next.js detecte que es una ruta debe agregarse un archivo llamado page.tsx
> - Este archivo aquí se importarán todos los componentes del lado del servidor (SSR).
> - OPCIONAL: Puede agregarse en la misma ruta un archivo llamado layout.tsx.
> - OPCIONAL: Este archivo agrega los componentes hijos y otros componentes que solo pueden ser vistos en esa ruta.
> - Carpeta /api contiene todo lo relacionado con autenticacion, Gsuite, etc.
> - Carpeta /components todo lo relacionado con los componentes.
> - Carpeta /mocks todo lo relacionado con mocks.
> - Carpeta /services todo lo relacionado con peticiones hacia el backend.

> [!IMPORTANT]
> Todo componente que se vaya a crear y tenga alguna funcionalidad/hook que sea del lado del cliente, debe agregarse al inicio del archivo el texto de 'use client', esto para que no genere errores ya que solo este componente será generado del lado del cliente.
