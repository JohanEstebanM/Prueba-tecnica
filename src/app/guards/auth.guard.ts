import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * Guard de autenticación para proteger rutas en la aplicación.
   * 
   * Este guard se usa para restringir el acceso a ciertas rutas si el usuario no está autenticado.
   * Verifica si existe un token en `localStorage`. 
   * - Si no hay token, redirige al usuario a la página de login y bloquea el acceso a la ruta.
   * - Si hay token, permite el acceso a la ruta protegida.
   * 
   * @param router - Servicio de navegación para redirigir al usuario si no está autenticado.
   */
  constructor(private router: Router) {}

  /**
   * Método que determina si un usuario puede acceder a una ruta protegida.
   * 
   * @returns `true` si el usuario tiene un token válido en `localStorage`, de lo contrario, `false`.
   */
  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Obtiene el token de autenticación del almacenamiento local

    if (!token) {
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión si no está autenticado
      return false; // Bloquea el acceso a la ruta protegida
    }

    return true; // Permite el acceso a la ruta si hay un token
  }
}
