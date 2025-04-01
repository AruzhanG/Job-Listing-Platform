import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule] 
})
export class VacanciesComponent {
  vacancies = [
    { id: 1, title: 'Frontend Developer', company: 'Tech Corp', location: 'Алматы' },
    { id: 2, title: 'Backend Developer', company: 'Innovate Ltd.', location: 'Астана' },
    { id: 3, title: 'UI/UX Designer', company: 'Creative Agency', location: 'Шымкент' }
  ];
}
