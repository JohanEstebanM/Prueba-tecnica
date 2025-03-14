import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Interceptor de solicitudes HTTP para agregar el token de autenticación a las cabeceras.
   * 
   * Este interceptor se ejecuta antes de cada solicitud HTTP y verifica si hay un token almacenado en `localStorage`.
   * Si hay un token, clona la solicitud original y le agrega el encabezado `Authorization` con el token en formato Bearer.
   * Luego, la solicitud modificada se envía al siguiente manejador (`next`).
   * 
   * @param req - La solicitud HTTP original.
   * @param next - El manejador de la solicitud que la envía al servidor.
   * @returns Un observable con la respuesta de la solicitud.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // Obtiene el token de autenticación del almacenamiento local

    if (token) {
      // Si hay un token, clona la solicitud y agrega el encabezado de autorización
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned); // Envía la solicitud con el encabezado modificado
    }

    return next.handle(req); // Si no hay token, envía la solicitud original sin modificarla
  }
}
