import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointment-create',
  standalone: false,
  templateUrl: './appointment-create.component.html',
  styleUrl: './appointment-create.component.css'
})
export class AppointmentCreateComponent {
  // Objeto que almacena los datos ingresados por el usuario para crear una cita
  newAppointment = {
    user: '', // ID del cliente
    workshop: '', // ID del taller
    technical: '', // ID del técnico
    date: '', // Fecha de la cita (YYYY-MM-DD)
    time: '' // Hora de la cita (HH:MM)
  };

  constructor(
    private router: Router, // Servicio para la navegación entre rutas
    private appointmentService: AppointmentService // Servicio para manejar citas
  ) {}

  // Método para crear una cita
  createAppointment() {
    // Validar que todos los campos estén llenos
    if (this.isValidAppointment(this.newAppointment)) {
      // Construcción del objeto con los datos en el formato requerido por la API
      const appointmentData = {
        clientId: Number(this.newAppointment.user), // Convertir a número
        workshopId: Number(this.newAppointment.workshop), // Convertir a número
        technicianId: Number(this.newAppointment.technical), // Convertir a número
        date: new Date(`${this.newAppointment.date}T${this.newAppointment.time}:00Z`).toISOString() // Formatear la fecha en ISO 8601
      };

      // Llamada al servicio para crear la cita en la API
      this.appointmentService.createAppointment(appointmentData).subscribe({
        next: response => {
          console.log('Cita creada en la API:', response);
          this.router.navigate(['/appointmentview']); // Redirigir a la vista de citas
        },  
        error: err => {
          console.error('Error al crear la cita:', err);
        }
      });
    } else {
      alert('Por favor, llena todos los campos.'); // Alerta si hay campos vacíos
    }
  }

  // Método para validar que todos los campos del formulario estén completos
  isValidAppointment(appointment: any): boolean {
    return Object.values(appointment).every(value => 
      typeof value === 'string' ? value.trim() !== '' : value !== null && value !== undefined
    );
  }
}
