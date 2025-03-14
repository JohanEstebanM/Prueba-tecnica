import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Appointment {
  workshop: string;
  date: string;
  time: string;
  technical: string;
  user: string;
}

@Component({
  selector: 'app-appointment-create',
  standalone: false,
  templateUrl: './appointment-create.component.html',
  styleUrl: './appointment-create.component.css'
})
export class AppointmentCreateComponent {
  newAppointment: Appointment = {
    workshop: '',
    date: '',
    time: '',
    technical: '',
    user: '',
  };

  constructor(private router: Router) {}

  createAppointment() {
    if (this.isValidAppointment(this.newAppointment)) {
      // Simulación de guardar la cita (puedes enviar a una API aquí)
      console.log('Cita creada:', this.newAppointment);

      // Redirigir a la lista de citas
      this.router.navigate(['/appointmentview']);
    } else {
      alert('Por favor, llena todos los campos.');
    }
  }

  isValidAppointment(appointment: Appointment): boolean {
    return Object.values(appointment).every(value => value.trim() !== '');
  }
  
}
