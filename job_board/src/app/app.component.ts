import { Component, OnInit } from '@angular/core';
  import { CommonModule, NgIf } from '@angular/common';
  import { RouterOutlet, Router, RouterModule, NavigationEnd } from '@angular/router';
  import { AuthService } from './services/auth.service';
  import { HttpClientModule } from '@angular/common/http';
  import { Observable } from 'rxjs';
import { User } from './models/user';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NgIf, RouterModule, HttpClientModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
  })
  export class AppComponent {
    currentUser$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  logout(): void {
    this.authService.logout();
  }
  }