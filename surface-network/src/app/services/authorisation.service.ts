import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthRequest, AuthResponse } from "../models/user-auth";
import { Observable, tap } from "rxjs";

@Injectable ({
    providedIn: 'root'
})
export class AuthorisationService {
    private http: HttpClient = inject(HttpClient);

    private apiUrl = 'https://localhost:7001/api/v1/account/authorization';

    login(userData: AuthRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, userData).pipe(
            tap(response => {
                if (response && response.token) {
                // Сохраняем токен авторизации в локальное хранилище браузера
                localStorage.setItem('auth_token', response.token);
                localStorage.setItem('username', response.nickname);
                }
            })
        );
    }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('username');
    }

    getToken(): string | null {
        return localStorage.getItem('auth_token');
    }
}
