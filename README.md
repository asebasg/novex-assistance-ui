# Novex Assistance UI

Novex Assistance UI es la interfaz web para la gestión de empleados, asistencias y reportes, conectada a la API REST de Novex Assistance (NestJS + Prisma). Permite a los usuarios interactuar de forma sencilla y visual con el sistema de control de personal y reportes.

## Estructura del proyecto

```
novex-assistance-ui/
│
├── app/
│   ├── empleados.html
│   └── ...
├── css/
│   ├── empleados.css
│   └── bootstrap*.css
├── js/
│   ├── empleados.js
│   └── ...
├── index.html
└── README.md
```

## Archivos principales

- `app/empleados.html`: Página para crear, consultar, actualizar y eliminar empleados.
- `js/empleados.js`: Lógica de frontend para manejar formularios y peticiones HTTP a la API.
- `css/empleados.css`: Estilos personalizados para la interfaz de empleados.
- `index.html`: Página principal o de inicio.
- Archivos de Bootstrap: Para estilos responsivos y componentes visuales.

## Dependencias utilizadas

- **Bootstrap**: Para estilos y diseño responsivo (solo frontend, archivos locales en `css/` y `js/`).
- **API Novex Assistance**: Requiere que el backend (NestJS + Prisma) esté corriendo en `http://localhost:3000`.
- **Vanilla JavaScript**: No requiere frameworks adicionales para el frontend.

## Características de la app

- Crear, consultar, actualizar y eliminar empleados desde la interfaz web.
- Visualización de empleados en tabla dinámica.
- Formularios validados y con feedback visual.
- Integración directa con la API REST de Novex Assistance.
- Diseño responsivo y moderno con Bootstrap y CSS personalizado.

## Funcionalidades

- **Crear empleado:** Formulario para registrar nuevos empleados.
- **Obtener empleados:** Botón para consultar y mostrar todos los empleados en una tabla.
- **Actualizar empleado:** Formulario para modificar datos de un empleado existente por ID.
- **Eliminar empleado:** Formulario para eliminar un empleado por ID.
- **Feedback visual:** Mensajes de éxito o error tras cada operación.

## Notas adicionales

- Asegúrate de tener el backend de Novex Assistance corriendo en `http://localhost:3000` para que la interfaz funcione correctamente.
- Los formularios de actualizar y eliminar requieren el ID del empleado.
- Si usas Live Server u otro servidor local, verifica que no haya conflictos de CORS (el backend debe tener CORS habilitado).
- Puedes personalizar los estilos en `css/empleados.css`.

---

Este proyecto es parte del ecosistema Novex Assistance y está pensado para facilitar la gestión de personal y reportes en organizaciones de cualquier tamaño.