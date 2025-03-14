import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Obtiene la ruta del directorio donde está ubicado este archivo
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
// Define la ruta de la carpeta que contiene los archivos estáticos del navegador
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express(); // Crea una instancia de la aplicación Express
const angularApp = new AngularNodeAppEngine(); // Inicializa el motor de renderizado para SSR (Server-Side Rendering)

// Configura Express para servir archivos estáticos desde la carpeta del frontend compilado
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y', // Configura la caché del navegador para que almacene archivos por un año
    index: false, // Evita la carga automática de index.html
    redirect: false, // No redirecciona automáticamente a archivos index
  }),
);

// Middleware para manejar todas las rutas con Angular SSR
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req) // Procesa la solicitud con Angular
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(), // Si hay una respuesta, la escribe en la respuesta de Express
    )
    .catch(next); // Captura errores y los pasa al siguiente middleware
});

// Verifica si este módulo es el principal y no está siendo importado
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000; // Usa el puerto de entorno o 4000 por defecto
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Exporta el manejador de solicitudes para que pueda ser usado en otro lugar
export const reqHandler = createNodeRequestHandler(app);
