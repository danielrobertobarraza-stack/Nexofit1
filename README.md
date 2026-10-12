# NexoFit — entrenamiento y bienestar

Aplicación web progresiva (PWA) en español. No necesita compilación ni dependencias: publica `index.html`, `manifest.webmanifest`, `sw.js` e `icon.svg` en el mismo directorio de un servidor HTTPS.

El diseño carga estilos y lógica adicionales desde `pro-theme.css`, `pro.js` y `fitness-builder.js`; publica todos esos archivos en la misma carpeta que `index.html`. Las fotografías se sirven desde Unsplash y las demostraciones GIF enlazan a FitFocus, así que requieren conexión y pueden quedar sujetas a cambios del proveedor. La primera vez, la app pregunta el nombre y cómo personalizar la imagen principal. Los navegadores no comparten automáticamente el nombre de la cuenta del teléfono con una página web.

Antes de ofrecer NexoFit comercialmente, reemplaza los GIF de FitFocus por medios propios o con licencia comercial, o consigue autorización escrita: los términos de FitFocus conceden una licencia de uso personal no comercial ([términos](https://www.ffocus.me/terms)). El nombre NexoFit es una propuesta y no se verificó disponibilidad de marca o dominio.

## Publicar

La forma más sencilla es subir estos archivos a un repositorio de GitHub y activar **Settings → Pages → Deploy from a branch**, seleccionando la rama principal y la carpeta raíz. También puedes subir la carpeta a un hosting estático como Netlify o Cloudflare Pages. La URL pública debe usar HTTPS para que el navegador permita instalar la app y activar el modo sin conexión.

Para probar localmente, abre una terminal en esta carpeta y ejecuta `python -m http.server 8000`; luego visita `http://localhost:8000`. El modo sin conexión y la instalación se activan desde un servidor web, no abriendo el HTML como archivo `file://`.

## Instalar en el celular

- **Android (Chrome):** abre la URL publicada, toca el menú ⋮ y elige **Instalar app** o **Añadir a pantalla de inicio**.
- **iPhone (Safari):** abre la URL, toca **Compartir** y selecciona **Añadir a pantalla de inicio**.

El perfil, los registros de peso y el contador de agua se guardan en el almacenamiento local del navegador de ese dispositivo. No se sincronizan entre dispositivos ni se envían a un servidor.
