import { Component, OnInit } from '@angular/core';
  import { CommonModule, NgIf } from '@angular/common';
  import { RouterOutlet, Router, RouterModule, NavigationEnd } from '@angular/router';
  import { AuthService } from './services/auth.service';
  import { HttpClientModule } from '@angular/common/http';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NgIf, RouterModule, HttpClientModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
  })
  export class AppComponent implements OnInit {
    title = 'job_board';
    isLoggedIn: boolean = false;

    constructor(
      private authService: AuthService,
      private router: Router
    ) {
      console.log('AppComponent инициализирован');
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          console.log('Текущий маршрут:', event.url);
        }
      });
    }

    ngOnInit(): void {
      console.log('AppComponent ngOnInit');
      this.authService.currentUser$.subscribe(user => {
        this.isLoggedIn = this.authService.isLoggedIn;
        console.log('Состояние авторизации:', this.isLoggedIn);
      });
    }

    logout(): void {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }