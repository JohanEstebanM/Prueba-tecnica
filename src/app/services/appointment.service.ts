import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interfaz que define la estructura de una solicitud de cita
interface AppointmentRequest {
  clientId: number;
  workshopId: number;
  technicianId: number;
  date: string;
}

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class AppointmentService {
  // URL base del backend para gestionar citas
  private apiUrl = 'http://localhost:5214/api/appointments';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los encabezados necesarios para las peticiones HTTP, incluyendo el token de autenticación.
   * @returns HttpHeaders con el token de autorización y tipo de contenido.
   * @throws Error si no hay un token almacenado en localStorage.
   */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtiene el token almacenado en el navegador
    if (!token) {
      throw new Error('No hay un token de autenticación');
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Agrega el token en la cabecera
      'Content-Type': 'application/json' // Define el tipo de contenido como JSON
    });
  }

  /**
   * Obtiene la lista de citas desde el backend.
   * @returns Un Observable que emite un array de citas.
   */
  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error al obtener citas:', error);
          return throwError(() => new Error('Error al obtener citas'));
        })
      );
  }

  /**
   * Crea una nueva cita en el sistema.
   * @param appointment Objeto con los datos de la cita a crear.
   * @returns Un Observable con la respuesta del backend.
   */
  createAppointment(appointment: AppointmentRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, appointment, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error al crear cita:', error);
          return throwError(() => new Error('Error al crear cita'));
        })
      );
  }
}
