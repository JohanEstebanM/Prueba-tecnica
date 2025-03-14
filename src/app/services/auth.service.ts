import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Proporciona este servicio en el nivel raíz de la aplicación
})
export class AuthService {
  // URL base para las peticiones de autenticación al backend
  private apiUrl = 'http://localhost:5214/auth';

  constructor(private http: HttpClient) {}

  /**
   * Realiza una petición al backend para autenticar a un usuario.
   * @param credentials Objeto con el nombre de usuario y contraseña.
   * @returns Un Observable que emite un objeto con un token de autenticación.
   */
  login(credentials: { username: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  /**
   * Registra un nuevo usuario en el sistema.
   * @param user Objeto con los datos del usuario a registrar.
   * @returns Un Observable con la respuesta del backend.
   */
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user);
  }
}
