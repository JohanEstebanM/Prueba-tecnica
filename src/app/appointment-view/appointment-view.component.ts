import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../services/appointment.service';

/**
 * Interfaz que define la estructura de una cita.
 */
interface Appointment {
  id: number;
  clientId: number;
  workshopId: number;
  technicianId: number;
  date: string; // Fecha de la cita en formato string
}

@Component({
  selector: 'app-appointment-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.css']
})
export class AppointmentViewComponent implements OnInit {
  appointments: Appointment[] = []; // Lista completa de citas
  paginatedAppointments: Appointment[] = []; // Citas paginadas para mostrar
  appointmentsPerPage = 3; // Número de citas por página
  currentPage = 1;
  totalPages = 1;

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
        this.totalPages = Math.ceil(this.appointments.length / this.appointmentsPerPage);
        this.updatePaginatedAppointments();
      },
      error: (error) => {
        console.error('Error al cargar citas', error);
      }
    });
  }

  updatePaginatedAppointments(): void {
    const startIndex = (this.currentPage - 1) * this.appointmentsPerPage;
    this.paginatedAppointments = this.appointments.slice(startIndex, startIndex + this.appointmentsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedAppointments();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedAppointments();
    }
  }
}
