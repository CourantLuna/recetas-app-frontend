# RecetasApp - Frontend

Bienvenido al repositorio del **frontend** de RecetasApp, una aplicación interactiva y moderna para la gestión y visualización de recetas culinarias. Este proyecto está desarrollado utilizando **React.js** con Material-UI para la interfaz de usuario, ofreciendo una experiencia ágil, responsiva y atractiva.

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características Principales](#características-principales)
- [Tecnologías Usadas](#tecnologías-usadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## Descripción

El frontend de RecetasApp sirve como la cara visible de la aplicación. Está diseñado para facilitar la interacción con las recetas y los ingredientes mediante una interfaz amigable y funcionalidades intuitivas.

Entre las funcionalidades principales se incluyen:

- Navegación dinámica entre **Recetas** e **Ingredientes** mediante pestañas.
- Visualización, creación, edición y eliminación de recetas e ingredientes.
- Soporte para interacciones avanzadas como autocompletado, calificaciones y manejo de información nutricional.

---

## Características Principales

- **Navegación Fluida:** Uso de **React Router** para manejar rutas dinámicas y asegurar transiciones rápidas.
- **Componentes Modulares:** Divididos en vistas (Views) y componentes reutilizables (Components).
- **Diseño Responsivo:** Material-UI asegura que la interfaz sea visualmente atractiva en dispositivos móviles y de escritorio.
- **Estado Dinámico:** Manejo de datos con **hooks** como `useState` y `useEffect` para garantizar actualizaciones en tiempo real.
- **Integración Backend:** Consumo de APIs desarrolladas con Node.js y Express para la gestión de recetas e ingredientes.

---

## Tecnologías Usadas

### Lenguajes y Librerías
- **React.js**: Para la construcción de la interfaz de usuario.
- **Material-UI**: Para componentes estilizados y responsivos.
- **Axios**: Para el consumo de APIs REST.
- **React Router**: Manejo de rutas dinámicas.

### Estilos
- **CSS personalizado**: Para ajustes adicionales en diseño.
- **Material-UI Themeing**: Consistencia en los estilos globales.

### Herramientas
- **Node.js y npm**: Para la gestión de dependencias.
- **Vite/React Scripts**: Para desarrollo y construcción del proyecto.

---

## Estructura del Proyecto

```
recetasapp-frontend/
├── public/               # Archivos estáticos
├── src/
│   ├── components/       # Componentes reutilizables (RecipeCard, SearchBar, etc.)
│   ├── views/            # Vistas principales (RecetasView, IngredientesView, etc.)
│   ├── api/              # Configuración de Axios y endpoints
│   ├── App.js            # Entrada principal de la app
│   ├── index.js          # Renderizado principal
├── package.json          # Dependencias y scripts
├── README.md             # Este archivo
```

---

## Instalación

Sigue estos pasos para ejecutar el frontend localmente:

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tuusuario/recetasapp-frontend.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd recetasapp-frontend
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias, como la URL base del backend:

   ```env
   REACT_APP_API_BASE_URL=http://localhost:3001/api
   ```

5. Inicia la aplicación:

   ```bash
   npm start
   ```

6. Abre el navegador en `http://localhost:3000` para ver la aplicación en acción.

---

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

- **`npm start`**: Corre la aplicación en modo desarrollo.
- **`npm run build`**: Genera una versión optimizada para producción.
- **`npm test`**: Ejecuta pruebas unitarias.
- **`npm run lint`**: Analiza y formatea el código siguiendo las reglas de ESLint.

---

## Flujo de Trabajo

1. **Pestañas Dinámicas:**
   - Navega entre recetas e ingredientes desde la interfaz principal.

2. **Gestión de Recetas:**
   - Añade, edita o elimina recetas desde la vista de recetas.
   - Visualiza los detalles completos de cada receta (ingredientes, instrucciones, calificaciones).

3. **Gestión de Ingredientes:**
   - Añade, edita o elimina ingredientes desde la vista de ingredientes.
   - Asocia ingredientes con recetas mediante un flujo de autocompletado y cantidad.

4. **Consumo de APIs:**
   - Las acciones en el frontend se sincronizan con el backend mediante Axios.

---

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir:

1. Haz un fork de este repositorio.
2. Crea una nueva rama:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. Realiza los cambios y haz commit:

   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```

4. Sube los cambios a tu rama:

   ```bash
   git push origin feature/nueva-funcionalidad
   ```

5. Abre un Pull Request.

---

## Licencia

Este proyecto está licenciado bajo la **MIT License**. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

## Contacto

Para cualquier consulta o reporte de errores, por favor contacta a **[tu-email@ejemplo.com](mailto:heydi.working@gmail.com)** o abre un issue en el repositorio.

¡Gracias por contribuir a RecetasApp!
