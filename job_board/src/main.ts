import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Импортируем маршруты
import { provideHttpClient } from '@angular/common/http'; // Импортируем HttpClient

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()] // Подключаем маршруты
}).catch(err => console.error(err));