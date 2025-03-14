import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { AppointmentService } from '../services/appointment.service';

interface Appointment {
  id: number;
  clientId: number;
  workshopId: number;
  technicianId: number;
  date: string;
}

@Component({
  selector: 'app-appointment-view',
  standalone: true,          // Marca el componente como standalone
  imports: [CommonModule],    // Agrega CommonModule para usar *ngIf, *ngFor, etc.
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.css']
})
export class AppointmentViewComponent implements OnInit {
  appointments: Appointment[] = [];

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        console.log('Citas recibidas:', data);
        this.appointments = data;
      },
      error: (error) => {
        console.error('Error al cargar citas', error);
      }
    });
  }
}
