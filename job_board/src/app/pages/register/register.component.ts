import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterRequest } from '../../models/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  registerModel: RegisterRequest = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Если пользователь уже вошел, перенаправляем
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    
    this.authService.register(this.registerModel)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: err => {
          this.error = err.error?.message || 'Ошибка регистрации. Пожалуйста, попробуйте еще раз.';
          this.loading = false;
        }
      });
  }
}