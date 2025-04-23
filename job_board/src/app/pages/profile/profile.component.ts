import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { User } from '../../models/user';
import { Application } from '../../models/application';
import { AuthService } from '../../services/auth.service';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  applications: Application[] = [];
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    this.applicationService.getUserApplications()
      .subscribe({
        next: applications => {
          this.applications = applications;
          this.loading = false;
        },
        error: err => {
          this.error = 'Не удалось загрузить отклики';
          this.loading = false;
        }
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  withdrawApplication(id: number): void {
    if (confirm('Вы уверены, что хотите отозвать отклик?')) {
      this.applicationService.withdrawApplication(id)
        .subscribe({
          next: () => {
            this.loadApplications();
          },
          error: err => {
            this.error = 'Не удалось отозвать отклик';
          }
        });
    }
  }
}
