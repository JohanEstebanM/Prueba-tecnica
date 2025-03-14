import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login', // Nombre del selector para usar este componente en la plantilla
  standalone: true, // Define que este componente puede funcionar sin depender de un módulo
  templateUrl: './login.component.html', // Ruta de la plantilla HTML del componente
  styleUrls: ['./login.component.css'], // Ruta de los estilos CSS asociados al componente
  imports: [CommonModule, FormsModule] // Importa módulos comunes y formularios para su uso
})
export class LoginComponent {
  username: string = ''; // Almacena el nombre de usuario ingresado
  password: string = ''; // Almacena la contraseña ingresada
  errorMessage: string = ''; // Almacena un mensaje de error en caso de fallo en el login

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Maneja el proceso de inicio de sesión enviando las credenciales al servicio de autenticación.
   * Si el login es exitoso, almacena el token y redirige a la página de citas.
   * Si falla, muestra un mensaje de error.
   */
  login() {
    console.log('Enviando:', { username: this.username, password: this.password });
  
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        if (response?.token) {
          localStorage.setItem('token', response.token); // Guarda el token en el almacenamiento local
          console.log('Token guardado:', localStorage.getItem('token'));
          this.router.navigate(['/appointments']); // Redirige a la página de citas
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos'; // Muestra mensaje de error si no hay token
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage = 'Usuario o contraseña incorrectos'; // Muestra mensaje de error en caso de fallo
      }
    });
  }
}
