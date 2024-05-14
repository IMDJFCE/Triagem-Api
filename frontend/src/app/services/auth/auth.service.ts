import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from 'src/app/models/LoginRequest';
import { LoginResponse } from 'src/app/models/LoginResponse';
import { UsuarioRequest } from 'src/app/models/UsuarioRequest';
import { UsuarioResponse } from 'src/app/models/UsuarioResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  login(usuario: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseURL}/auth/login`, usuario)
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('usuarioId', response.usuarioId);
          }
        })
      );
  }

  signup(usuario: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.baseURL}/auth/cadastro`, usuario);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
  }

  isAuthenticated(){
    return !!localStorage.getItem('token');
  }
}
