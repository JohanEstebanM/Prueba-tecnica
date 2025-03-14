import { Component } from '@angular/core';

@Component({
  selector: 'app-appointments', // Nombre del selector que se usará en el HTML para renderizar este componente
  standalone: false, // Indica que este componente no es autónomo y puede depender de otros módulos
  templateUrl: './appointments.component.html', // Ruta al archivo de plantilla HTML del componente
  styleUrl: './appointments.component.css' // Ruta al archivo de estilos CSS del componente (posible error: debería ser `styleUrls`)
})
export class AppointmentsComponent {
  /**
   * Componente `AppointmentsComponent`.
   * 
   * Este componente representa la vista de citas dentro de la aplicación.
   * Actualmente, no tiene lógica implementada, pero servirá para mostrar y gestionar citas.
   */
}
