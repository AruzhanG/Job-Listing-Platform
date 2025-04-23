import { Routes } from '@angular/router';
  import { VacanciesComponent } from './pages/vacancies/vacancies.component';
  import { LoginComponent } from './pages/login/login.component';
  import { RegisterComponent } from './pages/register/register.component';
  import { ProfileComponent } from './pages/profile/profile.component';
  import { authGuard } from './guards/auth.guard';

  export const routes: Routes = [
    { path: 'vacancies', component: VacanciesComponent },
    { path: 'vacancy/:id', component: VacanciesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/vacancies', pathMatch: 'full' }
  ];