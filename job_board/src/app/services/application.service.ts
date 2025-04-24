import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Замените на URL вашего API

  constructor(private http: HttpClient) {}

  getUserApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/applications/my`);
  }

  applyForJob(vacancyId: number): Observable<Application> {
    return this.http.post<Application>(`${this.apiUrl}/applications`, { vacancyId });
  }

  withdrawApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/applications/${id}`);
  }
}