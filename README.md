# Blog Deportivo - Proyecto

Pequeña página estática de un blog personal sobre deporte. Incluye 5 rutinas con imágenes, búsqueda, favoritos (localStorage) y modo oscuro.

Archivos:
- `index.html` - Página principal
- `css/styles.css` - Estilos
- `js/script.js` - Lógica de renderizado e interactividad

Cómo ejecutar (Windows PowerShell):

1. Abrir PowerShell en la carpeta del proyecto:

   cd C:\Users\marir\Desktop\BLOCK_PERSONAL

2. Iniciar servidor HTTP local (requiere Python instalado):

   python -m http.server 8000

3. Abrir en el navegador: http://localhost:8000

Notas:
- Las imágenes se cargan desde Unsplash. Si alguna no carga, revisa conexión a internet.
- Favoritos y tema oscuro se guardan en localStorage del navegador.

Siguientes mejoras opcionales:
- Añadir paginación y etiquetas (categorías).
- Formularios para crear nuevas rutinas dinámicamente.
- Soporte para compartir en redes y descarga de PDF.
