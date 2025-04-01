import { Routes } from '@angular/router';
import { VacanciesComponent } from './pages/vacancies/vacancies.component';

export const routes: Routes = [
  { path: 'vacancies', component: VacanciesComponent },
  { path: '', redirectTo: '/vacancies', pathMatch: 'full' }  
];
