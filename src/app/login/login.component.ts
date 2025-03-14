import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common'; // ✅ Importar CommonModule
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule] // ✅ Se agregan los módulos necesarios
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('Enviando:', { username: this.username, password: this.password });
  
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
          console.log('Token guardado:', localStorage.getItem('token'));
          this.router.navigate(['/appointments']);
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
  
}
