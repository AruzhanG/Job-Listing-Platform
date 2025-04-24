import { User } from './user';

export interface LoginRequest {
    email: string;
    password: string;
  }

  export interface RegisterRequest {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role: string;
  }
  
 export interface AuthResponse {
    user: User | null; // Теперь user может быть null
    token: string;
  }