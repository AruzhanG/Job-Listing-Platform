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
    lastName: '',
    role: ''
  };
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/profile']);
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    
    if (!this.registerModel.role) {
      this.error = 'Пожалуйста, выберите роль';
      this.loading = false;
      return;
    }

    this.authService.register(this.registerModel)
      .subscribe({
        next: () => {
          this.router.navigate(['/profile']);
        },
        error: err => {
          console.error('Registration error:', err); // Log the full error
          this.error = err.error?.message || 'Ошибка регистрации. Пожалуйста, попробуйте еще раз.';
          this.loading = false;
        }
      });
  }
}