import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  get token(): string | null {
    return this.currentUserValue?.token || null;
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login/`, credentials).pipe(
      tap((response: any) => {
        console.log('Ответ от сервера:', response);
        if (response.error) {
          throw new Error(response.error);
        }
        if (response.access) {
          const authResponse: AuthResponse = {
            token: response.access,
            user: null
          };
          localStorage.setItem('access_token', response.access);
          
          // Возвращаем observable, который завершится только после получения профиля
          return this.fetchUserProfile(response.access).pipe(
            tap(user => {
              authResponse.user = user;
              this.setUserData(authResponse);
            })
          );
        } else {
          throw new Error('Токен доступа отсутствует в ответе');
        }
      }),
      catchError(this.handleError)
    );
  }

  fetchUserProfile(token: string): Observable<User> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<User>(`${this.apiUrl}/users/profile/`, { headers });
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register/`, userData).pipe(
      tap(response => this.setUserData(response))
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
    this.currentUserSubject.next(null);
  }

  private setUserData(response: AuthResponse): void {
    if (response && response.token && response.user) { // Проверяем, что response.user не null
      const user = { ...response.user, token: response.token };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    } else {
      console.error('Не удалось установить данные пользователя: response.user is null');
      this.currentUserSubject.next(null);
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Произошла ошибка. Пожалуйста, попробуйте снова.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.message || error.error?.error || 'Ошибка innerHTML';
    }
    return throwError(() => new Error(errorMessage));
  }
}