// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { LoginRequest } from '../../models/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  loginModel: LoginRequest = {
    email: '',
    password: ''
  };
  error = '';
  loading = false;
  returnUrl = '/';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // При загрузке получаем URL для возврата после успешного входа
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    // Если пользователь уже вошел, перенаправляем
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    
    this.authService.login(this.loginModel)
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: err => {
          this.error = err.error?.message || 'Ошибка входа. Пожалуйста, проверьте данные.';
          this.loading = false;
        }
      });
  }
}