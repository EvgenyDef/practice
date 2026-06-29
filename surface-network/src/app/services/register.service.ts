import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegisterRequest, RegisterResponse } from "../models/user-registration";

@Injectable ({
    providedIn: 'root'
})
export class RegisterService {
    private http: HttpClient = inject(HttpClient);

    private apiUrl = 'https://localhost:7001/api/v1/account/register'; 

    register(userData: RegisterRequest): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(this.apiUrl, userData);
  }
}